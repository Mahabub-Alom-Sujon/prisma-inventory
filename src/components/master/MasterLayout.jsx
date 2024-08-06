"use client";
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineBank, AiOutlineLogout, AiOutlineMenu, AiOutlineUser, AiOutlineUnorderedList } from 'react-icons/ai';
import { Accordion, Container, Navbar } from 'react-bootstrap';
import { BsBagPlus, BsBagX, BsBox, BsCartPlus, BsCircle, BsGraphUp, BsPeople } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';
import { RiDashboardLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Change import statement
import { usePathname } from 'next/navigation';
const MasterLayout = (props) => {
  const router = useRouter();
  let currentPath=usePathname();
  const contentRef = useRef(null);
  const sideNavRef = useRef(null);
  const topNavRef = useRef(null);
  const [storedPhoto, setStoredPhoto] = useState(null);
  useEffect(() => {
        const savedPhoto = localStorage.getItem('photo');
        if (savedPhoto) {
            setStoredPhoto(savedPhoto);
        }
  }, []);
  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef.current;
    let content = contentRef.current;
    let topNav = topNavRef.current;

    if (sideNav.classList.contains('side-nav-open')) {
      sideNav.classList.add('side-nav-close');
      sideNav.classList.remove('side-nav-open');
      content.classList.add('content-expand');
      content.classList.remove('content');
      topNav.classList.remove('top-nav-open');
      topNav.classList.add('top-nav-close');
    } else {
      sideNav.classList.remove('side-nav-close');
      sideNav.classList.add('side-nav-open');
      content.classList.remove('content-expand');
      content.classList.add('content');
      topNav.classList.add('top-nav-open');
      topNav.classList.remove('top-nav-close');
    }
  };
  const isSidebarAccordionActive = () => {
    let index = -1;
    sidebarItems.forEach((item, idx) => {
      if (item.url === currentPath) {
        index = idx;
      }
      item.subMenu.forEach((subItem) => {
        if (subItem.url === currentPath) {
          index = idx;
        }
      });
    });
    return index;
  };


  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <RiDashboardLine size={16} className="side-bar-item-icon" />,
      url: '/',
      subMenu: [],
    },
    {
      title: 'Customer',
      icon: <BsPeople className="side-bar-item-icon" />,
      url: '/Customer',
      subMenu: [
        {
          title: 'New Customer',
          icon: <BsCircle className="side-bar-item-icon" />,
          url: '/CustomerCreateUpdate',
        },
        {
          title: 'Customer List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/CustomerList',
        },
      ],
    },
    {
      title: 'Supplier',
      icon: <TbTruckDelivery className="side-bar-item-icon" />,
      url: '/Supplier',
      subMenu: [
        {
          title: 'New Supplier',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/SupplierCreateUpdate',
        },
        {
          title: 'Supplier List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/SupplierList',
        },
      ],
    },
    {
      title: 'Expense',
      icon: <AiOutlineBank className="side-bar-item-icon" />,
      url: '/Expense',
      subMenu: [
        {
          title: 'New Expense Type',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ExpenseTypeCreateUpdate'
        },
        {
          title: 'Expense Type List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ExpenseTypeList',
        },
        {
          title: 'New Expense',
          icon: <IoCreateOutline size={16} className="side-bar-item-icon" />,
          url: '/ExpenseCreateUpdate',
        },
        {
          title: 'Expense List',
          icon: <AiOutlineUnorderedList size={16} className="side-bar-item-icon" />,
          url: '/ExpenseList',
        },
      ],
    },
    {
      title: 'Product',
      icon: <BsBox className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'New Brand',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/BrandCreateUpdate',
        },
        {
          title: 'Brand List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/BrandList',
        },
        {
          title: 'New Category',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/CategoryCreateUpdate',
        },
        {
          title: 'Category List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/CategoryList',
        },
        {
          title: 'New Product',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ProductCreateUpdate',
        },
        {
          title: 'Product List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ProductList',
        },
      ],
    },
    {
      title: 'Purchase',
      icon: <BsBagPlus className="side-bar-item-icon" />,
      url: '/Purchase',
      subMenu: [
        {
          title: 'New Purchase',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/PurchaseCreate',
        },
        {
          title: 'Purchase List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/PurchaseList',
        },
      ],
    },
    {
      title: 'Sale',
      icon: <BsCartPlus className="side-bar-item-icon" />,
      url: '/Sale',
      subMenu: [
        {
          title: 'New Sale',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/SaleCreate',
        },
        {
          title: 'Sale List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/SalesList',
        },
      ],
    },
    {
      title: 'Return',
      icon: <BsBagX className="side-bar-item-icon" />,
      url: '/Return',
      subMenu: [
        {
          title: 'New Return',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ReturnCreate',
        },
        {
          title: 'Return List',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ReturnList',
        },
      ],
    },
    {
      title: 'Report',
      icon: <BsGraphUp className="side-bar-item-icon" />,
      url: '/Report',
      subMenu: [
        {
          title: 'Sale Report',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/SaleReport',
        },
        {
          title: 'Return Report',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ReturnReport',
        },
        {
          title: 'Purchase Report',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/PurchaseReport',
        },
        {
          title: 'Expense Report',
          icon: <BsCircle size={16} className="side-bar-item-icon" />,
          url: '/ExpenseReport',
        },
      ],
    },
  ];
  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/user/login'
  }
  return (
    <>
      <Navbar className="px-0">
        <Container fluid>
          <Navbar.Brand>
            <div ref={topNavRef} className="top-nav-open">
              <h4 className="text-white m-0 p-0">
                <a onClick={MenuBarClickHandler}>
                  <AiOutlineMenu />
                </a>
              </h4>
            </div>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
            <div className="user-dropdown">
               {/* {storedPhoto && <img className="icon-nav-img-lg mb-4" src={storedPhoto} alt="User" /> } */}
              <img className="icon-nav-img icon-nav" src={storedPhoto} alt="photo" />
              <div className="user-dropdown-content pb-3">
                <div className="mt-3 text-center">
                  <img className="icon-nav-img-lg" src={storedPhoto} alt="photo" />
                  <hr className="user-dropdown-divider p-0" />
                </div>
                <Link href="/Profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </Link>
                <Link href="/user/login" className="side-bar-item" onClick={handleLogout}>
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
      <div ref={sideNavRef} className="side-nav-open border-radius-0 card">
        <Link href="/" className="d-flex justify-content-center sticky-top bg-white">
          <img src="/images/inventory2.png" className="logo" />
        </Link>
        <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
          {sidebarItems.map((item, index) => {
            return item.subMenu.length !== 0 ? (
              <Accordion.Item key={index.toString()} eventKey={`${index}`} className="">
                <Accordion.Header>
                  <div className="side-bar-item">
                      {item.icon}
                      <span className="side-bar-item-caption">{item.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex.toString()}
                      href={subItem?.url}
                      className={currentPath ===subItem?.url? 'side-bar-item-active':'side-bar-item'}
                    >
                      {subItem?.icon}
                        <span className="side-bar-item-caption">{subItem?.title}</span>
                    </Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
                <Link
                    key={index.toString()}    
                    href={item?.url}
                    className={currentPath === item?.url ? 'side-bar-item-active':'side-bar-item'}
                >
                {item.icon}
                  <span className="side-bar-item-caption">{item.title}</span>
                </Link>
            );
          })}
        </Accordion>
      </div>
      <div ref={contentRef} className="content">
        {props.children}
      </div>
    </>
  );
};

export default MasterLayout;