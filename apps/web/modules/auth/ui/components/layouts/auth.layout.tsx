export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center">
            {children}
        </div>
    )
}