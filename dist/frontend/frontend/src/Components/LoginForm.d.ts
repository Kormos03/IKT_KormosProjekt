/// <reference types="react" />
interface Props {
    onSuccessfulLogin: (token: string) => void;
}
export declare function LoginForm({ onSuccessfulLogin }: Props): import("react").JSX.Element;
export {};
