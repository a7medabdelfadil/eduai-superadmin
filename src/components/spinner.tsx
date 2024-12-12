const Spinner = () => {
    return (
        <>
        <div className='flex space-x-2 justify-center items-center'>
            <span className='sr-only'>Loading...</span>
            <div className='h-6 w-6 bg-[#3E5AF0] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-6 w-6 bg-[#3E5AF0] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-6 w-6 bg-[#3E5AF0] rounded-full animate-bounce [animation-delay:-0.27s]'></div>
            <div className='h-6 w-6 bg-[#3E5AF0] rounded-full animate-bounce [animation-delay:-0.50s]'></div>
            <div className='h-6 w-6 bg-[#3E5AF0] rounded-full animate-bounce'></div>
        </div>
        </>
    );
}

export default Spinner;