import { createContext, useState, useContext } from "react";

const EditContext = createContext();

export function EditContextProvider({ children }) {
    const [editingBlogData, setEditingBlogData] = useState(null);
    return (
        <EditContext.Provider value={
            {
                editingBlogData,
                setEditingBlogData
            }
        }>
            {children}
        </EditContext.Provider>
    );
}

export function useBlogData() {
    const values = useContext(EditContext);

    return {
        editingBlogData: values.editingBlogData,
        setEditingBlogData: values.setEditingBlogData
    }
}

export default EditContext;

