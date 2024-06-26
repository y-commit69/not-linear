import { RefObject, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CloseSVG } from './components/close-button';
import { UserSVG } from './components/user-svg';
import { BacklogSVG } from './components/backlog-svg';

export const Index = () => {
  const { dialogRef } = useOutletContext<DialogProps>();
  const [issues, setIssues] = useState<any>([]);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueDescription, setNewIssueDescription] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newIssue = {
      id: crypto.randomUUID(),
      title: newIssueTitle,
      description: newIssueDescription,
      checked: false,
    };
    setIssues([...issues, newIssue]);
    setNewIssueTitle('');
    setNewIssueDescription('');
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">
        <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
          <div className="flex items-center h-9 gap-10 pl-8">
            <span>All issues</span>
            <button className="outline-1 outline-dashed outline-gray-300 rounded-sm text-gray-500 px-1">
              + Filter
            </button>
          </div>
        </header>

        <section className="text-sm">
          <header className="px-8 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300 flex items-center gap-2">
            <BacklogSVG name="Backlog" width={14} height={14} /> Backlog
          </header>
          <main>
            <div className="border-0 border-b border-solid border-gray-300 px-8 py-2">
              <ul>
                {issues.map((issue) => (
                  <li className="flex gap-4 items-center" key={issue.id}>
                    <input type="checkbox" value={issue.checked} />
                    <header>{issue.title}</header>
                    <p>{issue.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </section>
      </main>
      <Dialog
        handleFormSubmit={handleFormSubmit}
        setNewIssueTitle={setNewIssueTitle}
        setNewIssueDescription={setNewIssueDescription}
      />
    </>
  );
};

const Dialog = ({
  handleFormSubmit,
  setNewIssueTitle,
  setNewIssueDescription,
}) => {
  const {
    dialogInnerRef,
    dialogInnerStopPropagation,
    handleDialogClick,
    dialogRef,
  } = useOutletContext<DialogProps>();

  const handleCloseButtonClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <dialog
        id="dialog"
        ref={dialogRef}
        onClick={handleDialogClick}
        className="shadow-lg"
      >
        <div
          id="dialog-inner"
          ref={dialogInnerRef}
          onClick={dialogInnerStopPropagation}
        >
          <header className="flex justify-between items-center ">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center border border-solid border-gray-300 rounded-sm">
                <UserSVG name="User" color="#00ae28" width={12} height={12} />
              </span>
              New Issue
            </div>

            <button
              onClick={handleCloseButtonClick}
              className="flex justify-end hover:bg-gray-200 hover:rounded-md"
            >
              <span className=" rounded-md px-1  text-sm leading-none py-1">
                <CloseSVG name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
                <label htmlFor="" className="font-semibold">
                  <input
                    type="text"
                    placeholder="Issue title"
                    onChange={(e) => setNewIssueTitle(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Add description"
                    onChange={(e) => setNewIssueDescription(e.target.value)}
                  />
                </label>
                <footer>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <button className="">Backlog</button>
                    <button className="">Priority</button>
                    <button className="">Add labels</button>
                  </div>
                  <span className="flex justify-end ">
                    <button
                      type="submit"
                      className="bg-purple-400 rounded-md px-2 text-white text-sm py-1"
                    >
                      Create Issue
                    </button>
                  </span>
                  {/* <div>{JSON.stringify(newIssueTitle)}</div> */}
                  {/* <div>{JSON.stringify(newIssueDescription)}</div> */}
                  {/* <div>{JSON.stringify(issues)}</div> */}
                </footer>
              </form>
            </div>
          </main>
        </div>
      </dialog>
    </>
  );
};

type DialogProps = {
  handleDialogClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;
  dialogInnerStopPropagation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  dialogInnerRef: RefObject<HTMLDivElement>;
};
