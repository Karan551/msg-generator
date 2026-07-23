import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

interface sendVerificationEmailProps {
    userName: string,
    otp: string,
    email: string;
}

export default async function sendVerificationEmail({ userName, otp, email }: sendVerificationEmailProps): Promise<ApiResponse> {

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: "Mystery Message Verification Code:",
            react: VerificationEmail({ userName, otp })
        });

        return { success: true, message: "Verification email send successfully." };
    } catch (error) {
        console.log("Error sending verification email:: ", error);
        return { success: false, message: "Cannot send verification email." };
    }
}