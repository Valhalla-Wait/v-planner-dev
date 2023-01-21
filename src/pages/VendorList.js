import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import {connect, useDispatch} from "react-redux";
import {getLikedVendors} from "../Store/Actions/getLikedVendors";
import {getDetailVendor} from "../Store/Actions/getVendorAction";


function VendorList({getLiked,vendorsProps}) {
  console.log("vendors",vendorsProps)
  const dispatch = useDispatch()

  const [vendors, setVendors] = useState([
    {id: 1, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 2, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 3, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 4, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 5, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 6, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 7, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 8, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 9, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 10, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 11, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
    {id: 12, src: "/assets/images/vendor-poster.jpg", title: "Wedding Cakes", price: "2000-3000$", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."},
  ])

  const navigate = useNavigate()
  useEffect(()=>{
  getLiked()
  },[])
  return (
    <section className="vendors">
      <h3>My Vendors</h3>
      <div className="vendors__content">
        <div className="vendors__list">
          {
            vendorsProps.map(vendor => (
              <div className="vendors__item item-vendor" key={vendor.id}>
                <div className="item-vendor__header" onClick={() => navigate(`/vendor/${vendor.id}`)}>
                  <img className="item-vendor__img"  src={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${vendor.photos[1].name}`} alt="Avatar" />

                  <div className="item-vendor__actions">
                    <div className="item-vendor__like" onClick={e => e.stopPropagation()}><i className="icon-like"></i></div>
                    <div
                      className="item-vendor__chat"
                      onClick={e => {
                        e.stopPropagation()
                        navigate(`/chat/${vendor.id}`)
                      }}
                    ><i className="icon-chat"></i></div>
                  </div>
                </div>
                <div className="item-vendor__body">
                  <h4 className="item-vendor__title" onClick={() =>{

                    navigate(`/vendor/${vendor.id}`)}}>
                    { vendor.companyTitle }
                  </h4>
                  <div className="item-vendor__price">{ vendor.weddingActivity }</div>
                  <div className="item-vendor__text">{ vendor.companyDescription }</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>  
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    getLiked: ()=> dispatch(getLikedVendors())
  };
};

const mapStateToProps = function (state) {
  return {
    vendorsProps:state.myVendors.vendors,

  };
};
export default connect(mapStateToProps,mapDispatchToProps) (VendorList)