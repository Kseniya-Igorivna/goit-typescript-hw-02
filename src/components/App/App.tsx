import { useReducer, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";

const API_KEY = "z1yhqPetuRaXidnnfr8ElUmDlqWZxF_ZnRB_-hA1d1A";
const BASE_URL = "https://api.unsplash.com/search/photos";

interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface State {
  images: Image[];
  query: string;
  loading: boolean;
  error: string | null;
  page: number;
  selectedImage: { src: string; alt: string } | null;
}

const initialState: State = {
  images: [],
  query: "",
  loading: false,
  error: null,
  page: 1,
  selectedImage: null,
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        images: [...state.images, ...action.payload],
      };
    case "FETCH_ERROR":
      console.error(action.payload);
      return { ...state, loading: false, error: action.payload };
    case "SET_QUERY":
      return { ...state, query: action.payload, images: [], page: 1 };
    case "SET_PAGE":
      return { ...state, page: state.page + 1 };
    case "SET_SELECTED_IMAGE":
      return { ...state, selectedImage: action.payload };
    default:
      return state;
  }
};

export default function App() {
  Modal.setAppElement("#root");

  const [state, dispatch] = useReducer(reducer, initialState);
  const { images, query, loading, error, page, selectedImage } = state;

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(`${BASE_URL}`, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: response.data.results });
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Something went wrong. Please try again later.",
        });
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    dispatch({ type: "SET_QUERY", payload: newQuery });
  };

  const handleLoadMore = () => {
    dispatch({ type: "SET_PAGE" });
  };

  const handleImageClick = (src: string, alt: string) => {
    dispatch({ type: "SET_SELECTED_IMAGE", payload: { src, alt } });
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_SELECTED_IMAGE", payload: null });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={handleCloseModal}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}
      <Toaster />
    </div>
  );
}
