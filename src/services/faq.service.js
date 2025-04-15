import axiosInstance from "@/config/axiosInstance";

export const fetchFaq = async () => {
    try {
        const response = await axiosInstance.get('/faq/categories')
        console.log("response.data", response.data);
        return response.data
    } catch (error) {
        console.log(error);

    }
}