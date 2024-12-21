// import  { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // useHistory -> useNavigate
// import { getProductById, updateProduct, getCategoryList } from "../../apis/productApi";
//
// const ProductEdit = () => {
//     const { pno } = useParams(); // URL 파라미터로 pno 가져오기
//     const navigate = useNavigate(); // 페이지 이동을 위한 navigate 객체
//
//     const [editData, setEditData] = useState({
//         pname: '',
//         price: '',
//         pcode: '',
//         quantity: '',
//         pstatus: '판매중',
//         releasedAt: '',
//         ptags: '',
//         imageFiles: [],
//         detailImageFiles: [],
//         usageImageFiles: []
//     });
//
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [searchData, setSearchData] = useState({ keyword: '' });
//     const [categoryList, setCategoryList] = useState([]);
//     const [oldFiles, setOldFiles] = useState({
//         imageFiles: [],
//         detailImageFiles: [],
//         usageImageFiles: []
//     });
//     const [newFiles, setNewFiles] = useState({
//         imageFiles: [],
//         detailImages: [],
//         usageImages: []
//     });
//
//     const [error, setError] = useState(null);
//
//     // 상품 데이터 불러오기
//     const fetchProductData = async () => {
//         try {
//             const product = await getProductById(pno);
//             setEditData({
//                 pname: product.pname || '',
//                 price: product.price || '',
//                 pcode: product.pcode || '',
//                 quantity: product.quantity || '',
//                 pstatus: product.pstatus || '판매중',
//                 releasedAt: product.releasedAt || '',
//                 puseCase: product.puseCase || '',
//                 pusedItem: product.pusedItem || '',
//                 ptags: product.tags || '',
//             });
//             setOldFiles({
//                 imageFiles: product.imageFiles || [],
//                 detailImageFiles: product.detailImageFiles || [],
//                 usageImageFiles: product.usageImageFiles || [],
//             });
//             setSelectedCategory(product.category || null);
//         } catch (error) {
//             console.error("Failed to fetch product data:", error);
//             setError("상품 데이터를 불러오는 데 실패했습니다.");
//         }
//     };
//
//     // 카테고리 데이터 불러오기
//     const fetchCateGoryList = async (keyword = '') => {
//         const categories = await getCategoryList(keyword);
//         setCategoryList(categories.dtoList || []);
//     };
//
//     const handleSearch = () => {
//         fetchCateGoryList(searchData.keyword);
//     };
//
//     const handleRegistCategory = (category) => {
//         setSelectedCategory(category);
//     };
//
//     const handleRemoveCategory = () => {
//         setSelectedCategory(null);
//     };
//
//     const handleImageUpload = (type, event) => {
//         setNewFiles(prevState => ({
//             ...prevState,
//             [type]: Array.from(event.target.files)
//         }));
//     };
//
//     const handleClickUpdate = async () => {
//         const formData = new FormData();
//         formData.append('pname', editData.pname);
//         formData.append('price', editData.price);
//         formData.append('pcode', editData.pcode);
//         formData.append('quantity', editData.quantity);
//         formData.append('pstatus', editData.pstatus);
//         formData.append('releasedAt', editData.releasedAt);
//         formData.append('puseCase', editData.puseCase);
//         formData.append('pusedItem', editData.pusedItem);
//         formData.append('ptags', editData.ptags);
//         formData.append("categoryId", selectedCategory?.cno);
//
//         // 이미지 처리
//         oldFiles.imageFiles.forEach(file => formData.append('oldImageFiles', file));
//         oldFiles.detailImageFiles.forEach(file => formData.append('oldDetailFiles', file));
//         oldFiles.usageImageFiles.forEach(file => formData.append('oldUsageFiles', file));
//         newFiles.imageFiles.forEach(file => formData.append('imageFiles', file));
//         newFiles.detailImages.forEach(file => formData.append('detailImages', file));
//         newFiles.usageImages.forEach(file => formData.append('usageImages', file));
//
//         try {
//             await updateProduct(formData); // 상품 수정 API 호출
//             navigate("/products"); // 상품 목록으로 이동
//         } catch (error) {
//             console.error("Failed to update product:", error);
//             setError("상품 수정에 실패했습니다.");
//         }
//     };
//
//     useEffect(() => {
//         fetchProductData();
//         fetchCateGoryList();
//     }, [pno]); // pno가 변경될 때마다 상품 데이터와 카테고리 데이터를 다시 불러옴
//
//     return (
//         <div className="container mt-4">
//             <div className="card p-4 shadow">
//                 <h2 className="text-center mb-4">상품 수정</h2>
//
//                 {/* 카테고리 선택 */}
//                 <div className="mb-4">
//                     <label className="input-group-text w-25" htmlFor="category">카테고리</label>
//                     {selectedCategory ? (
//                         <div className="d-flex justify-content-between align-items-center m-1 p-1 border rounded">
//                             <div className="text-truncate">{selectedCategory.parentName} / {selectedCategory.cname}</div>
//                             <button className="btn btn-danger btn-sm" onClick={handleRemoveCategory} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>X</button>
//                         </div>
//                     ) : (
//                         <div className="text-muted">카테고리를 선택하세요</div>
//                     )}
//
//                     {/* 검색 기능 */}
//                     <div className="input-group mb-3">
//                         <input className="form-control w-25" type="text" value={searchData.keyword} onChange={(e) => setSearchData({ keyword: e.target.value })} placeholder="카테고리를 검색하세요" />
//                         <button className="btn btn-primary" onClick={handleSearch}>검색</button>
//                     </div>
//
//                     {/* 카테고리 목록 테이블 */}
//                     <div className="table-responsive">
//                         <table className="table table-hover">
//                             <thead>
//                             <tr>
//                                 <th>상위 카테고리</th>
//                                 <th>카테고리명</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {categoryList.map(category => (
//                                 <tr key={category.cno} onClick={() => handleRegistCategory(category)} className="cursor-pointer">
//                                     <td>{category.parentName}</td>
//                                     <td>{category.cname}</td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//
//                 {/* 상품 정보 수정 */}
//                 <div className="input-group mb-3">
//                     <label className="input-group-text w-25" htmlFor="pname">상품명</label>
//                     <input type="text" id="pname" className="form-control" value={editData.pname} onChange={(e) => setEditData({ ...editData, pname: e.target.value })} placeholder="상품명을 입력하세요" />
//                 </div>
//                 <div className="input-group mb-3">
//                     <label className="input-group-text w-25" htmlFor="price">판매가</label>
//                     <input type="text" id="price" className="form-control" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} placeholder="판매가를 입력하세요" />
//                 </div>
//                 <div className="input-group mb-3">
//                     <label className="input-group-text w-25" htmlFor="pcode">자사품번</label>
//                     <input type="text" id="pcode" className="form-control" value={editData.pcode} onChange={(e) => setEditData({ ...editData, pcode: e.target.value })} placeholder="자사품번을 입력하세요" />
//                 </div>
//                 <div className="input-group mb-3">
//                     <label className="input-group-text w-25" htmlFor="quantity">수량</label>
//                     <input type="number" id="quantity" className="form-control" value={editData.quantity} onChange={(e) => setEditData({ ...editData, quantity: e.target.value })} placeholder="수량을 입력하세요" />
//                 </div>
//                 <div className="input-group mb-3">
//                     <label className="input-group-text w-25" htmlFor="ptags">사용처</label>
//                     <input type="text" id="ptags" className="form-control" value={editData.puseCase} onChange={(e) => setEditData({ ...editData, puseCase: e.target.value })} placeholder="사용처를 입력하세요" />
//                 </div>
//                 <div className="input-group mb-3">
//                     <label className="input-group-text w-25" htmlFor="pusedItem">사용아이템</label>
//                     <input type="text" id="pusedItem" className="form-control" value={editData.pusedItem} onChange={(e) => setEditData({ ...editData, pusedItem: e.target.value })} placeholder="사용아이템을 입력하세요" />
//                 </div>
//
//                 <button className="btn btn-primary w-100 mt-4" onClick={handleClickUpdate}>
//                     상품 수정
//                 </button>
//                 {error && <div className="alert alert-danger mt-3">{error}</div>}
//             </div>
//         </div>
//     );
// };
//
// export default ProductEdit;
