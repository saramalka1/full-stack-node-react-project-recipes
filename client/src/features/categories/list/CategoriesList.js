import { Link, useSearchParams } from "react-router-dom"
import Search from "../../../components/common/search/Search"
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../categoryApiSlice"
import { IoTrashOutline } from "react-icons/io5";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import './category-list.css'
import useGetFilePath from "../../../hooks/useGetFilePath";
const CategoriesList = () => {
    const { data: categories, isLoading, isError, error } = useGetAllCategoriesQuery()
    const [deleteCategory, { data, isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete }] = useDeleteCategoryMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    const {getFilePath}=useGetFilePath()


    if (isLoading)
        return
    if (isError) return <h3>{JSON.stringify(error)}</h3>


    const clickDelete = (id) => {
        Modal.confirm({
            title: 'האם אתה בטוח שברצונך למחוק את הקטגוריה? שים לב-בפעולה זו ימחקו כל המתכונים בקטגוריה זו',
            okText: 'אני רוצה למחוק',
            okType: 'danger',
            cancelText: 'ביטול',
            icon: <ExclamationCircleOutlined className="custom-icon" />,                className: 'custom-modal', // קבוצת הסגנון שלי
            okButtonProps: { className: 'custom-ok-button' }, // סגנון הכפתור "מחק"
            cancelButtonProps: { className: 'custom-cancel-button' }, // סגנון הכפתור "בטל"
            onOk() {
                deleteCategory(id);
            },
            onCancel() {
                console.log('בוטל מחיקת המשתמש');
            },
        });
    };
    
    const categoriesShow = !q ? [...categories.data] : categories.data.filter(cat => cat.name.indexOf(q) > -1)
    return (

        <div className="categories-list">

            <div className="categories-list-top">
                <Search placeholder={"חפש קטגוריה"} />
                <Link to="/categories/add" className="categories-list-add-button">
                    הוסף קטגוריה
                </Link>
            </div>
            <table className="categories-list-table">
                <thead>
                    <tr>
                        <td>שם הקטגוריה</td>
                        <td className="description">תיאור</td>
                        <td>פעולות</td>
                    </tr>
                </thead>
                <tbody>
                    {categoriesShow?.map(cat => {
                        return (
                            <tr key={cat._id}>
                                <td>
                                    <div className="categories-list-category">
                                        <img
                                            src={getFilePath(cat.img) || ''}
                                            width={40}
                                            height={40}
                                            className="categories-list-company-image"
                                        />
                                        <Link to={`/categories/${cat._id}`} className="link-to-recipes">
                                            {cat.name}
                                        </Link>
                                    </div>
                                </td>
                                <td>

                                    {cat.description}

                                </td>
                                <td>
                                    <div className="categories-list-buttons">
                                        <Link to={`/categories/${cat._id}`} className="categories-list-button categories-list-view">
                                            צפייה
                                        </Link>
                                        <button onClick={() => clickDelete(cat._id)} className="categories-list-button categories-list-delete">
                                            <IoTrashOutline />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}

export default CategoriesList