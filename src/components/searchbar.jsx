import React, { useState } from "react";
import { TextField, Button, ListItem } from "@mui/material";
import bookService from "../service/book.service";
import "../components/Header/Header.css";
// import { Search } from "@mui/icons-material";
import { List } from "@mui/material";
import { useCartContext } from "../context/cart";
import { useAuthContext } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import shared from "../utils/shared";
import { fetchCartData } from "../state/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {


  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setBookList(res);
  };
  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
  };
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const addToCart = (book) => {
    if (!authData.id) {
      navigate("/login");
      toast.error("Please login before adding books to cart");
    } else {
      shared
        .addToCart(book, authData.id)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success("Item added in cart");
            // cartContext.updateCart();
            dispatch(fetchCartData(authData.id));
          }
        })
        .catch((err) => {
          toast.warning(err);
        });
    }
  };

  return (
    <div className="h-searchbar">
      <div className="h-searchbar-center">
        <div className="h-txtfield">
          <TextField
            id="outlined-basic"
            placeholder="what are you looking for..."
            variant="outlined"
            name="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {openSearchResult && (
            <>
              <div
                className="search-overlay"
                onClick={() => {
                  document.body.classList.remove("search-result-open");
                  setOpenSearchResult(false);
                }}
              ></div>
              <div className="h-product-list">
                <div className="h-no-prod">
                  {bookList?.length === 0 && (
                    <p className="h-not-found"> No Products Found </p>
                  )}
                </div>
                <List className="h-related-product-list">
                  {bookList?.length > 0 &&
                    bookList.map((item, i) => {
                      return (
                        <ListItem>
                          <div className="h-product-list-inner">
                            <div className="h-inner-lft">
                              <span className="txt-41 txt-lb">{item.name}</span>
                              <p>{item.description}</p>
                            </div>
                            <div className="h-inner-rght">
                              <span>{item.price}</span>
                              <Button size="small" className="c-f14d54">
                                <Link onClick={() => addToCart(item)}>
                                  Add to cart
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
              </div>
            </>
          )}
        </div>
        <div className="h-search-btn">
          <Button
            type="submit"
            variant="contained"
            className="bg-search"
            color="success"
            onClick={search}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}