import {useNavigate} from "react-router-dom";

function NaviBarTitle({title, path}) {

    const navigate = useNavigate();

    return (
        <div
            className="fixed top-0 left-0 right-0 min-h-16 px-8 py-4 bg-white z-50"
            style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="h-[7rem] pt-12 flex items-center justify-center box-border relative">
                <img
                    onClick={() => navigate(path)}
                    src="/images/chevron-left.svg"
                    alt="go back"
                    className="absolute left-0 mt-1 h-6"
                />
            <div>
            <span className="text-bara_sodomy text-[1.5rem] font-bold text-center">
                {title}
            </span>
                </div>
            </div>
        </div>
    );
}

export default NaviBarTitle;