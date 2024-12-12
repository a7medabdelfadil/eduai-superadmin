import React, { useState } from 'react'

interface SecoundStepProps {
  handleNext: () => void;
  handlePrev: () => void;
  prerequisites: any;
  setPrerequisites: any;
  handleSend: () => void;
}

const SecoundStep: React.FC<SecoundStepProps> = ({ handleNext, handlePrev, prerequisites, setPrerequisites, handleSend }) => {

  const [benefits, setBenefits] = useState([{ id: 1, value: "" }]);

  const handleAddFieldBenefit = () => {
    setBenefits([...benefits, { id: benefits.length + 1, value: "" }]);
  };

  const handleInputChangeBenefit = (e: any, id: number) => {
    const updatedFields = benefits.map((field: any) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setBenefits(updatedFields);
  };

  const handleAddFieldPrerequisites = () => {
    setPrerequisites([...prerequisites, ""]);
  };

  const handleInputChangePrerequisites = (e: any, index: number) => {
    const updatedFields = prerequisites.map((field: any, fieldIndex: any) =>
      fieldIndex === index ? e.target.value : field
    );
    setPrerequisites(updatedFields);
  };

  const handleNextAndSend = async () => {
    handleNext()
    handleSend()
  }

  


return (
  <div className='bg-white p-3 shadow-md card rounded-md'>

    <div>

      <div className="space-y-4 p-6">
        <div>
          <div className='flex justify-between items-center mb-2'>
            <span className="block text-[#041631] dark:text-white md:text-lg font-medium mb-2">
              What are the benefits for students in this course?
            </span>
            <button
              onClick={handleAddFieldBenefit}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2511_1920)">
                  <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="#3E5AF0" />
                </g>
                <rect x="0.5" y="0.5" width="23" height="23" rx="4.5" stroke="#3E5AF0" />
                <defs>
                  <clipPath id="clip0_2511_1920">
                    <rect width="24" height="24" rx="5" fill="white" />
                  </clipPath>
                </defs>
              </svg>

            </button>
          </div>
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Write benefits"
                value={benefit.value}
                onChange={(e) =>
                  handleInputChangeBenefit(e, benefit.id)
                }
                className="flex-1 border dark:bg-slate-700 border-gray-300 dark:border-gray-800 rounded-md p-2"
              />

            </div>
          ))}
        </div>

        <div>
          <div className='flex justify-between items-center mb-2'>
            <span className="block text-[#041631] dark:text-white md:text-lg font-medium mb-2">
              What are the prerequisites for starting this course?
            </span>

            <button
              onClick={handleAddFieldPrerequisites}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2511_1920)">
                  <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="#3E5AF0" />
                </g>
                <rect x="0.5" y="0.5" width="23" height="23" rx="4.5" stroke="#3E5AF0" />
                <defs>
                  <clipPath id="clip0_2511_1920">
                    <rect width="24" height="24" rx="5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          {prerequisites.map((prerequisite: any, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-2 mb-2"
            >
              <input
                type="text"
                placeholder="Write prerequisites"
                value={prerequisite}
                onChange={(e) =>
                  handleInputChangePrerequisites(e, index)
                }
                className="flex-1 border dark:bg-slate-700 border-gray-300 dark:border-gray-800 rounded-md p-2"
              />
            </div>
          ))}
        </div>
      </div>

    </div>

    <div className='my-4 flex justify-end'>
      <button onClick={handlePrev} className='text-[#367AFF] font-medium border flex items-center md:text-lg py-1.5 ps-8 pe-5 rounded-lg hover:opacity-80 me-2' >
        <svg className='me-2' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.28943 0.707204C6.89892 0.316674 6.26572 0.316674 5.87522 0.707204L0.987819 5.5994C0.207419 6.3806 0.20772 7.6464 0.98842 8.4272L5.87882 13.3175C6.26932 13.7081 6.90252 13.7081 7.29304 13.3175C7.68357 12.927 7.68357 12.2938 7.29304 11.9033L3.10742 7.7177C2.71682 7.3272 2.71692 6.69399 3.10742 6.30349L7.28943 2.12141C7.67996 1.73089 7.67996 1.09772 7.28943 0.707204Z" fill="#3E5AF0" />
        </svg>
        Previous
      </button>
      <button onClick={handleNextAndSend} className='text-white font-medium border border-[#367AFF] flex items-center bg-[#367AFF] md:text-lg py-1.5 px-8 rounded-lg hover:opacity-80' >Next
        <svg width="24" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.2106 18.2928C10.6011 18.6833 11.2343 18.6833 11.6248 18.2928L16.5122 13.4006C17.2926 12.6194 17.2923 11.3536 16.5116 10.5728L11.6212 5.6825C11.2307 5.2919 10.5975 5.2919 10.207 5.6825C9.81643 6.073 9.81643 6.7062 10.207 7.0967L14.3926 11.2823C14.7832 11.6728 14.7831 12.306 14.3926 12.6965L10.2106 16.8786C9.82004 17.2691 9.82004 17.9023 10.2106 18.2928Z" fill="white" />
        </svg>
      </button>
    </div>

  </div>
)
}

export default SecoundStep
