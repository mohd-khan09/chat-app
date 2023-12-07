const MessageWithPhoto = () => {
  const messages = [
    {
      sender: 'User1',
      message:
        'Hey!Thats great to hear! What are you up to today? lorem25Thats great to hear!Thats great to hear! What are you up to today? lorem25Thats great to hear! What are you up to today?Thats great to hear! What are you up to today?Thats great to hear! What are you up to today? What are you up to today?Thats great to hear! What are you up to today?Thats great to hear! What are you up to today? lorem25🍕Just working ',
    },
    { sender: 'User2', message: 'Hi! How are you?' },
    { sender: 'User1', message: 'I am fine, thank you!' },
    {
      sender: 'User2',
      message:
        "That's great to hear! What are you up to today? lorem25That's great to hear! What are you up to today?That's great to hear! What are you up to today?That's great to hear! What are you up to today?",
    },
    {
      sender: 'User1',
      message:
        'Just working  great to hear! What are you up to today? lorem25Thats great to hear! What are you up to today?Thats great to hear! What are you up to today?Thats on some coding projects. How about you?',
    },
    {
      sender: 'User2',
      message:
        "I'm also working on some coding projects. It's been a busy week!",
    },
    {
      sender: 'User1',
      message: 'That sounds like a lot of fun! Keep up the good work!',
    },
    { sender: 'User2', message: "Thanks! I'll do my best." },
    {
      sender: 'User1',
      message: "You're doing great! Don't forget to take breaks.",
    },
    {
      sender: 'User2',
      message: "I'll keep that in mind. Thanks for the advice!",
    },
    {
      sender: 'User1',
      message: "I'll keep that in mind. Thanks for the advice!",
    },
  ];
  return (
    // <>
    //   <div className=" flex  h-[137px]  w-[487px] ">
    //     <div className="">
    //       <img
    //         className="h-[60px] w-[60px] rounded-[50%] object-cover"
    //         alt=""
    //         src="avatar6.jpg"
    //       />
    //     </div>

    //     <div className=" ml-[15px] mt-[35px] ">
    //       <p className=" flex flex-grow rounded-[10px]  bg-white pb-[14px] pl-[21px]  pr-[12px] pt-[10.5px] leading-5">
    //         Hey! lorem25🍕
    //       </p>
    //     </div>
    //   </div>

    //   <div className="ml-[600px] flex h-[137px] w-[487px] justify-end">
    //     <div className="mr-[15px] mt-[35px]">
    //       <p className="flex flex-grow rounded-[10px] bg-white pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] leading-5">
    //         Hey! lorem25🍕
    //       </p>
    //     </div>

    //     <div className="">
    //       <img
    //         className="h-[60px] w-[60px] rounded-[50%] object-cover"
    //         alt=""
    //         src="avatar6.jpg"
    //       />
    //     </div>
    //   </div>
    // </>
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex h-full w-full pb-[20px]  ${
            message.sender === 'User1' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.sender === 'User1' ? (
            <>
              <div className="mr-[15px] mt-[25px]">
                <p className="flex max-w-[600px] flex-grow rounded-[10px] bg-white pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] leading-5">
                  {message.message}
                </p>
              </div>
              <div className="flex-shrink-0 pr-[20px]">
                <img
                  className="h-[60px] w-[60px]  rounded-[50%] object-cover"
                  alt=""
                  src="avatar1.jpg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex-shrink-0 pl-[20px]">
                <img
                  className="h-[60px] w-[60px] rounded-[50%] object-cover"
                  alt=""
                  src="avatar6.jpg"
                />
              </div>
              <div className="ml-[15px] mt-[25px] ">
                <p className="flex  max-w-[600px] flex-grow   rounded-[10px] bg-white pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] leading-5">
                  {message.message}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default MessageWithPhoto;
