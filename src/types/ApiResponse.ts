import { Message } from "@/types/schema.types";

export interface ApiResponse {
    success: boolean,
    message: string,
    isAccptingMsg?: boolean,
    messages?: Array<Message>;
}