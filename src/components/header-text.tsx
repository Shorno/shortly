export default function HeaderText() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8  text-center">
            <div className="text-center">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">Shorten and
                    Track</p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    <span className="text-[#ff6060]">Long</span> <span className="text-[#ffbe53]">Links Instantly</span>
                </p>
            </div>
            <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-3xl">
                <p className="sm:text-xl text-[#d9dff2] dark:text-gray-300">
                    Transform long, unwieldy links into clean, memorable and trackable short URLs with just one click.
                </p>
            </div>
        </div>
    )
}

