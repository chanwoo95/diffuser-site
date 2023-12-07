import React, { useRef, useState } from "react";
import { uploadImage } from "../api/cloudinary";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const inputRef = useRef();

  const [file, setFile] = useState();
  const [product, setProduct] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file)
      .then((image) => addNewProduct(image, product))
      // 로딩 스피너 추가하면 좋을듯?
      .finally(() => {
        alert("새 상품이 추가되었습니다");
        onClearInput();
      });
    setProduct({});
    setFile("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFile(files && files[0]);
      return;
    }

    setProduct((product) => ({ ...product, [name]: value }));
  };

  const onClearInput = () => {
    inputRef.current.value = "";
  };

  return (
    <section className="flex justify-center h-full p-8 border border-black">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="product_img" className="">
            이미지:{" "}
          </label>
          <div className="flex flex-col items-center">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="product_img"
                className="w-[400px] h-[400px]"
              />
            )}
            <input
              ref={inputRef}
              className="my-3"
              type="file"
              id="product_img"
              name="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label htmlFor="product_category" className="mr-3">
              카테고리:{" "}
            </label>
            <select
              name="category"
              className="border border-black"
              id="product_category"
              value={product.category ?? ""}
              onChange={(e) => handleChange(e)}
            >
              <option value="">선택해주세요</option>
              <option value="Bed">Bed Room</option>
              <option value="Living">Living Room</option>
              <option value="Bath">Bath Room</option>
              <option value="Dining">Dining</option>
            </select>
          </div>
          <div>
            <label htmlFor="product_title" className="mr-3">
              상품명:{" "}
            </label>
            <input
              id="product_title"
              className="border border-black"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              value={product.title ?? ""}
              placeholder="상품명"
            />
          </div>
          <div>
            <label htmlFor="product_price" className="mr-3">
              가격:{" "}
            </label>
            <input
              className="border border-black"
              type="number"
              name="price"
              onChange={(e) => handleChange(e)}
              value={product.price ?? ""}
              placeholder="가격"
            />
          </div>
          <div className="flex">
            <label htmlFor="product_description" className="mr-3">
              설명:{" "}
            </label>
            <textarea
              className="border border-black"
              name="description"
              onChange={(e) => handleChange(e)}
              value={product.description ?? ""}
              id="product_description"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="p-3 text-white bg-slate-500 ">상품 등록</button>
        </div>
      </form>
    </section>
  );
}
