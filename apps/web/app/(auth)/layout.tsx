const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-rose-200/50">
            {children}
        </div>
    )
}
export default Layout;