import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces, developed by Facebook.",
  },
  {
    question: "What is Tailwind CSS?",
    answer:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
  },
];

const FAQ = () => {
  const [openStates, setOpenStates] = useState(
    new Array(faqs.length).fill(false)
  );

  const toggleAnswer = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <div className="w-full h-screen flex text-white bg-gradient-to-bl from-neutral-950 to-neutral-700 tracking-wide">
      <div className="w-full px-4 lg:w-[80%] lg:mx-auto flex flex-col mt-10 overflow-auto">
        <h2 className="w-full text-4xl text-center font-semibold mb-4">
          thoughts
        </h2>
        <div className="w-full my-4 flex items-center mb-2 justify-between">
          <h2 className="w-full text-xl font-semibold">FAQs</h2>
          <h1 className="flex items-center text-neutral-400">
            <Link to="/">Home</Link> / <span>FAQs</span>
          </h1>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className="w-full">
            <button
              className="w-full flex items-center justify-between p-2 hover:bg-neutral-600"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <MdAdd
                className={`transition-transform duration-300 ${
                  openStates[index] ? "rotate-45" : ""
                }`}
              />
            </button>
            <p
              className={`text-neutral-300 p-2 text-sm ${
                openStates[index] ? "" : "hidden"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
