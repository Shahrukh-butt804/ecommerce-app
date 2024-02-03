import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faComments } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { fbconfig } from "../firebase/firebase.mjs";
import { getFirestore } from "firebase/firestore";


function Details() {

    let app = fbconfig;
    const db = getFirestore(app);

    const [product, setMyProduct] = useState()
    const [userInfo, setuserInfo] = useState()
    const [isLoading, setloader] = useState(true)

    let { id } = useParams();
    console.log(id)
    useEffect(() => {
        if (id) getProduct(id)
    }, [id])



    const getProduct = async (id) => {

        const docRef = doc(db, "product", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setMyProduct(docSnap.data());
            getUserInfo(docSnap.data().user_id);

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    async function getUserInfo(id) {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("user is this", docSnap.data());
            setuserInfo(docSnap.data());
            setloader(false)

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }







    return (
        <>

            {isLoading ?
                <div className="container text-center mt-5" >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                :
                <>

                    <div className="container d-flex" id="main-div" >
                        <div className="container w-75 ms-0 mt-3" id="forimages" >

                            <div className="container w-75" id="curosel">
                                <Carousel>
                                    <Carousel.Item interval={500}>
                                        <img className='d-block ' width={750} height={600}
                                            src={product.thumbnail_image_url}
                                            alt="" text="First slide" />
                                    </Carousel.Item>
                                    {/* <Carousel.Item interval={500}>
                                        <img className='d-block' width={750} height={600}
                                            src={""} alt="" text="Second slide" />
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img className='d-block' width={750} height={600}
                                            src={""} alt="" text="Second slide" />
                                    </Carousel.Item> */}
                                </Carousel>


                                <div className="container text-center mt-3">
                                    <h2> { }</h2>
                                </div>

                                <div className="container mt-4 me-4 border border-secondary p-3">
                                    <h2>Details</h2>
                                    <div className="container mt-3 me-3">
                                        <div className="row">
                                            <div className="col">price</div>
                                            <div className="col"><b>$ {product.price}</b></div>
                                            <div className="col">Category</div>
                                            <div className="col"><b>{product.category}</b></div>
                                        </div>
                                        <div className="row">
                                            <div className="col">Brand</div>
                                            <div className="col"><b>{product.brand}</b></div>
                                            <div className="col">Rating</div>
                                            <div className="col"><b>4.5</b></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="container mt-4 me-4 border border-secondary p-3">
                                    <h2 className="me-2">Description</h2>
                                    <p>{product.discription}</p>
                                </div>

                            </div>
                        </div>

                        <div className="container mt-5" id="second">
                            <div className="container mt-5 d-flex">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&usqp=CAU" alt="" style={{ width: '23%', borderRadius: "20px solid black" }} />
                                <div className="container ms-4">
                                    <b>{userInfo.firstName.toUpperCase() + " " + userInfo.lastName.toUpperCase()}</b>
                                    <p>Sailor</p>
                                    <b>See profile </b>
                                </div>
                            </div>
                            <button className="container btn btn-success mt-4"><FontAwesomeIcon className="me-2" icon={faPhone} />{userInfo.number}</button>
                            <button className="container btn btn-success mt-4"><FontAwesomeIcon className="me-2" icon={faComments} />Chat</button>
                            <div className="container mt-4">
                                <h3 className="mt-4"><FontAwesomeIcon icon={faLocationDot} /> Location</h3>
                                <h5>{userInfo.address}</h5>
                            </div>
                        </div>


                    </div>







                </>


            }
        </>

    );

}
export default Details;