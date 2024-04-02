import { getExam } from "actions/exam";
import { getUser } from "actions/user";
import EditMarksForm from "components/forms/editMarks";
import { H1, BackButton, SubmitButton } from "components/utilities";

export default async function Page({ params }) {
  const studentRes = await getUser(params.studentId);
  const examRes = await getExam(params.examId);

  const foundExamSubject = examRes.exam.marks.find(
    (em) => em.subject === params.subjectId,
  );
  const foundExamSubjectStudent = foundExamSubject.student_marks.find(
    (eSStudent) => eSStudent.student == params.studentId,
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">Edit {studentRes.user.name} Marks</H1>
        <SubmitButton
          text="Update"
          loadingText="Updating"
          form="edit-marks-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <EditMarksForm
        examId={params.examId}
        subjectId={params.subjectId}
        studentId={params.studentId}
        studentMarks={foundExamSubjectStudent.obtained}
      />
    </>
  );
}
