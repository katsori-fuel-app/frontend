export const loginFormFieldEnum = {
    EMAIL: 'email',
    LOGIN: 'login',
    PASSWORD: 'password',
} as const;

export type LoginFormFieldEnum = (typeof loginFormFieldEnum)[keyof typeof loginFormFieldEnum];
