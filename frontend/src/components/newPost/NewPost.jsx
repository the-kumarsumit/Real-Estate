import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function NewPost() {
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles([...selectedFiles, ...files]);

    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...urls]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviewUrls];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setImagePreviewUrls(updatedPreviews);
  };

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    formats: ["header", "bold", "italic", "underline", "list", "link", "image"],
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quill.root.innerHTML);
      });

      return () => {
        quill.off("text-change");
      };
    }
  }, [quill]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("price", parseInt(e.target.price.value));
    formData.append("address", e.target.address.value);
    formData.append("city", e.target.city.value);
    formData.append("bedroom", parseInt(e.target.bedroom.value));
    formData.append("bathroom", parseInt(e.target.bathroom.value));
    formData.append("type", e.target.type.value);
    formData.append("property", e.target.property.value);
    formData.append("latitude", e.target.latitude.value);
    formData.append("longitude", e.target.longitude.value);
    formData.append("desc", value);
    formData.append("utilities", e.target.utilities.value);
    formData.append("pet", e.target.pet.value);
    formData.append("income", e.target.income.value);
    formData.append("size", parseInt(e.target.size.value));
    formData.append("school", parseInt(e.target.school.value));
    formData.append("bus", parseInt(e.target.bus.value));
    formData.append("restaurant", parseInt(e.target.restaurant.value));

    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        "http://localhost:8000/api/posts",
        formData,
        config
      );
      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate("/" + res?.data?.newPost?._id);
      }, 3000);
    } catch (err) {
      toast.error(err?.data?.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full lg:flex overflow-scroll sm:overflow-hidden">
      <div className="flex-[3] p-3 overflow-y-scroll">
        <h1>Add New Post</h1>
        <div className="mt-[30px] mb-[100px]">
          <form
            onSubmit={handleSubmit}
            className="flex justify-between flex-wrap gap-5"
          >
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="title">Title</label>
              <input
                className="p-5 rounded border"
                id="title"
                name="title"
                type="text"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="price">Price</label>
              <input
                className="p-5 rounded border"
                id="price"
                name="price"
                type="number"
                defaultValue="0"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="address">Address</label>
              <input
                className="p-5 rounded border"
                id="address"
                name="address"
                type="text"
              />
            </div>
            <div className="w-full h-80 flex flex-col gap-2.5">
              <label htmlFor="desc">Description</label>
              <div ref={quillRef} />
            </div>
            <div className="sm:w-[30%] mt-8 sm:mt-0 flex flex-col gap-2.5">
              <label htmlFor="city">City</label>
              <input
                className="p-5 rounded border"
                id="city"
                name="city"
                type="text"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                className="p-5 rounded border"
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                defaultValue="0"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                className="p-5 rounded border"
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                defaultValue="0"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="latitude">Latitude</label>
              <input
                className="p-5 rounded border"
                id="latitude"
                name="latitude"
                type="text"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="longitude">Longitude</label>
              <input
                className="p-5 rounded border"
                id="longitude"
                name="longitude"
                type="text"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="type">Type</label>
              <select className="p-[19px]" name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="type">Property</label>
              <select className="p-[19px]" name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="utilities">Utilities Policy</label>
              <select className="p-[19px]" name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="pet">Pet Policy</label>
              <select className="p-[19px]" name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="income">Income Policy</label>
              <input
                className="p-5 rounded border"
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                className="p-5 rounded border"
                min={0}
                id="size"
                name="size"
                type="number"
                defaultValue="0"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="school">School</label>
              <input
                className="p-5 rounded border"
                min={0}
                id="school"
                name="school"
                type="number"
                defaultValue="0"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="bus">Bus</label>
              <input
                className="p-5 rounded border"
                min={0}
                id="bus"
                name="bus"
                type="number"
                defaultValue="0"
              />
            </div>
            <div className="sm:w-[30%] flex flex-col gap-2.5">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                className="p-5 rounded border"
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                defaultValue="0"
              />
            </div>
            <button
              className="w-[30%] bg-[teal] text-[white] font-bold text-xl cursor-pointer rounded-[5px] border-[none] h-12 sm:h-auto disabled:bg-[#bed9d8] disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="flex-[1] bg-[#fcf5f3] p-3 overflow-y-scroll">
        <div className="flex flex-wrap gap-4 justify-center">
          {imagePreviewUrls.map((previewUrl, index) => (
            <div key={index} className="relative">
              <img
                className="w-36 h-36 object-cover rounded"
                src={previewUrl}
                alt={`Image preview ${index + 1}`}
              />
              <button
                type="button"
                className="absolute top-[-12px] right-[-12px] bg-red-500 text-white p-2 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9zm3.32 12.71a1 1 0 01-1.41 1.41L10 11.41l-2.91 2.9a1 1 0 01-1.41-1.41l2.9-2.91-2.89-2.9a1 1 0 111.41-1.41l2.91 2.9 2.9-2.89a1 1 0 011.41 1.41l-2.9 2.89 2.91 2.9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          name="uploadfile"
          id="img"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <div className="h-full ">
          <label
            className="block mt-4 p-2 w-full text-center text-white bg-blue-500 rounded cursor-pointer"
            htmlFor="img"
          >
            Click to upload image
          </label>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
