import React from 'react'

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center shrink-0 min-h-[64px] bg-base-300 text-base-content p-4">
            <aside>
                <p className='text-[14px] leading-[20px] px-[8px]'>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    )
}

export default Footer