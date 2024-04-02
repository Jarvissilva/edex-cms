"use server";
import connectDatabase from "utilities/connectDatabase";
import ExamModel from "models/exam";
import { revalidatePath } from "next/cache";
import { getSubjects } from "./subject";
import { getClassroom } from "./classroom";

export async function newExam(_, formData) {
  try {
    await connectDatabase();

    const subjectsRes = await getSubjects(formData.get("classroom"));
    const classroomRes = await getClassroom(formData.get("classroom"));

    await new ExamModel({
      classroom: formData.get("classroom"),
      name: formData.get("name"),
      isPublished: false,
      marks: subjectsRes.subjects.map((subject) => ({
        subject: subject._id,
        total_marks: 0,
        student_marks: classroomRes.classroom.students.map((cStudent) => ({
          student: cStudent.student._id,
          obtained: 0,
        })),
      })),
    }).save();

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]/exams",
      "page",
    );

    return { success: true, message: "Exam successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function getExams(classroomId) {
  try {
    await connectDatabase();

    const foundExams = await ExamModel.find({
      classroom: classroomId,
    });

    if (!foundExams[0])
      return { success: false, message: "Exams not found", exams: [] };

    return JSON.parse(JSON.stringify({ success: true, exams: foundExams }));
  } catch (error) {
    return { success: false, message: error.message, exams: [] };
  }
}
export async function getExam(id) {
  try {
    await connectDatabase();

    const foundExam = await ExamModel.findOne({ _id: id });

    if (!foundExam) return { success: false, message: "Exam not found" };

    return JSON.parse(JSON.stringify({ success: true, exam: foundExam }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function editMarks(_, formData) {
  try {
    await connectDatabase();
    const foundExam = await ExamModel.findById(formData.get("exam"));
    const foundExamSubject = foundExam.marks.find(
      (eSubject) => eSubject.subject == formData.get("subject"),
    );
    const foundExamSubjectStudent = foundExamSubject.student_marks.find(
      (eSStudent) => eSStudent.student == formData.get("student"),
    );
    foundExamSubjectStudent.obtained = formData.get("obtained_marks");
    await foundExam.save();

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]/exams/[examId]/marks/[subjectId]",
      "page",
    );

    return { success: true, message: "Marks successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function saveTotalMarks(formData) {
  try {
    await connectDatabase();

    await ExamModel.findOneAndUpdate(
      { _id: formData.get("exam"), "marks.subject": formData.get("subject") },
      {
        $set: {
          "marks.$.total_marks": formData.get("total_marks"),
        },
      },
    );

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]/exams/[examId]/marks/[subjectId]",
      "page",
    );

    return { success: true, message: "Total marks successfully saved" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function updateExamMarksPublishStatus(exam) {
  try {
    await connectDatabase();

    const foundExam = await ExamModel.findById(exam);

    const allMarksPublished = foundExam.marks.every(
      (subjectMarks) => subjectMarks.isPublished === true,
    );

    if (!allMarksPublished) {
      return {
        success: false,
        message: "All Subject Marks Not Yet Published",
      };
    }

    foundExam.isPublished = true;

    await foundExam.save();

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]/exams/[examId]/marks/[subjectId]",
      "page",
    );

    return { success: true, message: "Exam Marks Published" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function updateMarkPublishStatus(exam, subject) {
  try {
    await connectDatabase();

    const foundExam = await ExamModel.findById(exam);
    const foundExamSubject = foundExam.marks.find(
      (eSubject) => eSubject.subject == subject,
    );
    foundExamSubject.isPublished = true;

    await foundExam.save();

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]/exams/[examId]/marks",
      "page",
    );

    return { success: true, message: "Subject Marks Published" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
