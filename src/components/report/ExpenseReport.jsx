"use client"
import {useState} from "react";
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";
import exportFromJSON from "export-from-json";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { useRouter } from "next/navigation";

const ExpenseReport = () => {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [FormDate, setFormDate] = useState("");
    const [ToDate, setToDate] = useState("");
    const [Total, setTotal] = useState({ Amount: 0 });
    const fetchData = async () => {
        try {
            setSubmit(true);
            const res = await fetch(`/api/dashboard/report/expensesReport?FormDate=${FormDate}&ToDate=${ToDate}`);
            const ResJson = await res.json();
            if (ResJson.status === "success") {
                setDataList(ResJson.data.result || []);
                setTotal(ResJson.data.TotalAmount._sum || { Amount: 0 });
                SuccessToast("Report Success");
            } else {
                ErrorToast("Request Failed");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            ErrorToast("Request Failed");
        } finally {
            setSubmit(false);
        }
    };

    const inputOnChange = (name, value) => {
        if (name === "FormDate") {
            setFormDate(value);
        } else if (name === "ToDate") {
            setToDate(value);
        }
        setDataList([]);
    };
    const formSubmit = async (e) => {
        e.preventDefault();
        if (IsEmpty(FormDate)) {
            ErrorToast("Date From is Required !");
        } else if (IsEmpty(ToDate)) {
            ErrorToast("Date To is Required !");
        } else {
            fetchData();
        }
    };

    const onExport = (exportType, data) => {
        const fileName = 'ExpenseReport';
        if (data.length > 0) {
            const reportData = data.map((item) => ({
                "Amount": item.Amount,
                "Note": item.Note,
                "Category": item.expense_types.Name,
                "Date": moment(item.createdAt).format('MMMM Do YYYY')
            }));
            exportFromJSON({ data: reportData, fileName, exportType });
        }
    };

    return (
        <>
            <div className='container' id="from">
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-8 col-sm-10'>
                        <div className='from-box'>
                            <form className='card animated fadeIn p-5 shadow border-0'>
                                <h2>Expense Report by Date</h2>
                                <div className='col-lg-12'>
                                    <label className="form-label mb-3">Date From:</label>
                                    <input value={FormDate} onChange={(e) => inputOnChange("FormDate", e.target.value)} className="form-control mb-3" type="date"/>
                                </div>
                                <div className='col-lg-12'>
                                    <label className="form-label mb-3">Date To:</label>
                                    <input value={ToDate} onChange={(e) => inputOnChange("ToDate", e.target.value)} className="form-control mb-3" type="date"/>
                                </div>
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit ? <LoaderButton /> : "Create"}
                                </button>
                            </form>
                        </div>
                    </div>
                    {
                        dataList.length > 0? (
                        <div className="col-lg-12 col-md-12 mt-5">
                            <div className="card shadow border-0">
                                <div className="report p-5 text-center">
                                    <h2 className="mb-3">Total: {Total.Amount > 0 ? <CurrencyFormat value={Total.Amount} displayType={'text'} thousandSeparator={true} prefix={'$ '} /> : 0}</h2>
                                    <button onClick={() => onExport('csv', dataList)} className="frm-btn me-2">Download CSV</button>
                                    <button onClick={() => onExport('xls', dataList)} className="frm-btn me-2">Download XLS</button>
                                    <div className="table-responsive mt-4">
                                        <table className="table text-center table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Amount</th>
                                                    <th>Note</th>
                                                    <th>Category</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td><CurrencyFormat value={item.Amount} displayType={'text'} thousandSeparator={true} prefix={'$ '} /></td>
                                                        <td>{item.Note}</td>
                                                        <td>{item.expense_types.Name}</td>
                                                        <td>{moment(item.createdAt).format('MMMM Do YYYY')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ExpenseReport;