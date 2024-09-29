import "./loader2.scss"

interface Loader2Props {
    text?: string
}

function Loader2({text="در حال بارگزاری"}: Loader2Props) {


    return (
        <div>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="loader2"></div>
            </div>
        </div>
    );
}

export default Loader2;