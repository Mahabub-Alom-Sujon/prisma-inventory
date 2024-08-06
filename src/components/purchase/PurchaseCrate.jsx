"use client";
import { useEffect, useState } from "react";
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import { BsCartCheck} from "react-icons/bs";
import { MdDelete } from "react-icons/md";
const PurchaseCreate = (props) => {
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    const [data, setData] = useState({
        purchase: {
            SupplierID: "",
            VatTax: "",
            Discount: "",
            OtherCost: "",
            ShippingCost: "",
            GrandTotal: 0,
            Note: "",
        },
        products: [],
    });
    const [productForm, setProductForm] = useState({ ProductID: "", Qty: "", UnitCost: "" });
    useEffect(() => {
        calculateGrandTotal();
    }, [data.products, data.purchase.VatTax, data.purchase.Discount, data.purchase.OtherCost, data.purchase.ShippingCost]);

    const inputOnChange = (name, value) => {
        setData((prevData) => ({
            ...prevData,
            purchase: {
                ...prevData.purchase,
                [name]: value,
            },
        }));
    };

    const productOnChange = (name, value) => {
        setProductForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };
    const addProductToCart = () => {
        if (IsEmpty(productForm.ProductID) || IsEmpty(productForm.Qty) || IsEmpty(productForm.UnitCost)) {
            ErrorToast("All product fields are required!");
            return;
        }

        const total = parseInt(productForm.Qty) * parseFloat(productForm.UnitCost);
        setData((prevData) => ({
            ...prevData,
            products: [...prevData.products, { ...productForm, Total: total }],
        }));

        setProductForm({ ProductID: "", Qty: "", UnitCost: "" });
    };

    const removeProductFromCart = (index) => {
        setData((prevData) => ({
            ...prevData,
            products: prevData.products.filter((_, i) => i !== index),
        }));
    };

    const calculateGrandTotal = () => {
        const productTotal = data.products.reduce((sum, product) => sum + product.Total, 0);
        const { VatTax, Discount, OtherCost, ShippingCost } = data.purchase;
        const grandTotal = productTotal + parseFloat(OtherCost || 0) + parseFloat(ShippingCost || 0) + parseFloat(VatTax || 0) - parseFloat(Discount || 0);
        setData((prevData) => ({
            ...prevData,
            purchase: {
                ...prevData.purchase,
                GrandTotal: grandTotal,
            },
        }));
    };


    const formSubmit = async (e) => {
        e.preventDefault();

        if (IsEmpty(data.purchase.SupplierID)) {
            ErrorToast("Supplier is required!");
        }
        else if (IsEmpty(data.purchase.VatTax)) {
            ErrorToast("VatTax is required!")
        }
        else if (IsEmpty(data.purchase.Discount)) {
            ErrorToast("Discount is required!")
        }
        else if (IsEmpty(data.purchase.OtherCost)) {
            ErrorToast("OtherCost is required!")
        }
        else if (IsEmpty(data.purchase.ShippingCost)) {
            ErrorToast("ShippingCost is required!")
        }
        else if (IsEmpty(data.purchase.GrandTotal)) {
            ErrorToast("GrandTotal is required!")
        }
        else if (IsEmpty(data.purchase.Note)) {
            ErrorToast("Note is required!")
        }
        else {
            setSubmit(true);
            const options = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            let res = await fetch("/api/dashboard/purchases/create", options);
            let ResJson = await res.json();
            if (ResJson['status'] === "success") {
                setData({
                    purchase: {
                        SupplierID: "",
                        VatTax: "",
                        Discount: "",
                        OtherCost: "",
                        ShippingCost: "",
                        GrandTotal: 0,
                        Note: "",
                    },
                    products: [],
                });
                SuccessToast("Purchase Created");
                router.replace("/PurchaseList")
                router.refresh()
            }
            else {
                setSubmit(false);
                ErrorToast("Request Fail")
            }
        }
    };
    return (
        <div className="container purchase-create" id="from">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-8 col-sm-10">
                    <div className="from-box">
                        <from className="card animated fadeIn p-5 shadow border-0">
                            <h2 className="purchase">Create Purchase</h2>
                            <div className="col-lg-12">
                                <select
                                     value={data.purchase.SupplierID}
                                    onChange={(e) => inputOnChange("SupplierID", e.target.value)}
                                    className="form-select form-control mb-4"
                                >
                                    <option value="">Select Supplier</option>
                                    {props.Suppliers.map((item, i) => (
                                        <option key={i.toLocaleString()} value={item.id}>
                                            {item.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-12">
                                <input
                                    value={data.purchase.VatTax}
                                    onChange={(e) => inputOnChange("VatTax", parseFloat(e.target.value))}
                                    className="form-control mb-4"
                                    type="number"
                                    placeholder="Vat/Tax"
                                />
                                
                            </div>
                            <div className="col-lg-12">
                                <input
                                     value={data.purchase.Discount}
                                    onChange={(e) => inputOnChange("Discount", parseFloat(e.target.value))}
                                    className="form-control mb-4"
                                    type="number"
                                    placeholder="Discount"
                                />
                            </div>
                            <div className="col-lg-12">
                                <input
                                    value={data.purchase.OtherCost}
                                    onChange={(e) => inputOnChange("OtherCost", parseFloat(e.target.value))}
                                    className="form-control mb-4"
                                    type="number"
                                    placeholder="Other Cost"
                                />
                            </div>
                            <div className="col-lg-12">
                                <input
                                    value={data.purchase.ShippingCost}
                                    onChange={(e) => inputOnChange("ShippingCost", parseFloat(e.target.value))}
                                    className="form-control mb-4"
                                    type="number"
                                    placeholder="Shipping Cost"
                                />
                            </div>
                            <div className="col-lg-12">
                                <input
                                    value={data.purchase.GrandTotal}
                                    // onChange={(e) => inputOnChange("GrandTotal", parseFloat(e.target.value))}
                                    className="form-control mb-4"
                                    type="number"
                                    placeholder="Grand Total"
                                    readOnly
                                />
                            </div>
                            <div className="col-lg-12">
                                <input
                                     value={data.purchase.Note}
                                    onChange={(e) => inputOnChange("Note", e.target.value)}
                                    className="form-control mb-4"
                                    type="text"
                                    placeholder="Note"
                                />
                            </div>
                            <button onClick={formSubmit} type="submit" className="frm-btn">
                                {submit ? <LoaderButton /> : "Create"}
                            </button>
                        </from>
                    </div>
                </div>
                <div className="col-lg-7 col-md-8 col-sm-10">
                    <div className="card-box">
                        <div className="card animated fadeIn p-5 shadow border-0">
                            <div className="from-box">
                                <div className="row">
                                    <h2>Create Purchase</h2>
                                    <div className="col-lg-5 col-md-12 p-2">
                                        <select
                                        value={productForm.ProductID}
                                        onChange={(e) => productOnChange("ProductID", e.target.value)}
                                            className="form-select form-control form-control-sm"
                                        >
                                            <option value="">Select Product</option>
                                            {props.Products.map((item, i) => (
                                                <option key={i.toLocaleString()} value={item.id}>
                                                    {item.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-lg-2 col-md-12 col-sm-12 p-2">
                                        <input
                                            value={productForm.Qty}
                                            onChange={(e) => productOnChange("Qty", parseInt(e.target.value))}
                                            className="form-control form-control-sm"
                                            type="number"
                                            placeholder="Qty"
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-12 p-2">
                                        <input
                                            value={productForm.UnitCost}
                                            onChange={(e) => productOnChange("UnitCost", parseFloat(e.target.value))}
                                            className="form-control form-control-sm"
                                            type="number"
                                            placeholder="Unit Price"
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-12 p-2">
                                        <button
                                            type="button"
                                            onClick={addProductToCart}
                                            className="form-control-sm frm-btn py-0"
                                        >
                                            <BsCartCheck />
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-12 p-2">
                                        <table className="table text-center table-bordered">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.products.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{props.Products.find((p) => p.id === item.ProductID)?.Name}</td>
                                                        <td>{item.Qty}</td>
                                                        <td>{item.UnitCost}</td>
                                                        <td>{item.Total}</td>
                                                        <td>
                                                            <span
                                                                onClick={() => removeProductFromCart(index)}
                                                            >
                                                                <MdDelete className="delete" />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseCreate;