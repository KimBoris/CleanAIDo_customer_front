function NaviBar() {
    return (
        <div className="min-h-16">
            <div className="h-[7rem] pt-12 flex items-center justify-between box-border">
                <img src="/images/cleanaido_logo_sm_w.png" alt="logo" className="mt-[1.2rem] w-auto h-auto"/>
                <img src="/images/bell-w.svg" alt="알림" className="mt-[1.2rem] w-auto h-auto"/>
            </div>
        </div>
    );
}

export default NaviBar;