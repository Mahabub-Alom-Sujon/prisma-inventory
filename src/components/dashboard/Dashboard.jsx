"use client"
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Dashboard = (props) => {
    const { expenses, sales, purchase, returns } = props;
    const renderAreaChart = (data, color) => (
        <ResponsiveContainer className="mt-4" width="100%" height={200}>
            <AreaChart width={500} height={200} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="TotalAmount" stroke={color} fill={color} />
            </AreaChart>
        </ResponsiveContainer>
    );
    return (
        <>
            {/* <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='card shadow border-0 text-center'>
                            <div className='card-body p-4'>
                                <h2>
                                    <CurrencyFormat value={expenses.totalAmount._sum.Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h2>
                                <h3>Total Expense</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card shadow border-0 text-center'>
                            <div className='card-body p-4'>
                                <h2>
                                    <CurrencyFormat value={sales.totalAmount._sum['GrandTotal']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h2>
                                <h3>Total Sale</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card shadow border-0 text-center'>
                            <div className='card-body p-4'>
                                <h2>
                                    <CurrencyFormat value={purchase.totalAmount._sum['GrandTotal']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h2>
                                <h3>Total Purchase</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card shadow border-0 text-center'>
                            <div className='card-body p-4'>
                                <h2>
                                    <CurrencyFormat value={returns.totalAmount._sum["GrandTotal"]} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h2>
                                <h3>Total Return</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 py-4'>
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h5>Expense Last 30 Days</h5>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={expenses.last30Days} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="createdAt" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 py-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h5>Sales Last 30 Days</h5>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={sales.last30Days} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="createdAt" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h5>Purchase Last 30 Days</h5>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={purchase.last30Days} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="createdAt" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#00A884" fill="#00A884" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h5>Return Last 30 Days</h5>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={returns.last30Days} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="createdAt" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='container'>
                <div className='row'>
                    {[
                        { title: 'Total Expense', value: expenses.totalAmount?._sum?.Amount, color: '#CB0C9F' },
                        { title: 'Total Sale', value: sales.totalAmount?._sum?.GrandTotal, color: '#8884d8' },
                        { title: 'Total Purchase', value: purchase.totalAmount?._sum?.GrandTotal, color: '#00A884' },
                        { title: 'Total Return', value: returns.totalAmount?._sum?.GrandTotal, color: '#CB0C9F' }
                    ].map((item, index) => (
                        <div className='col-md-6 col-lg-3 pb-3' key={index}>
                            <div className='card shadow border-0 text-center'>
                                <div className='card-body p-4'>
                                    <h2>
                                        <CurrencyFormat value={item.value || 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </h2>
                                    <h3>{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='row'>
                    {[
                        { title: 'Expense Last 30 Days', data: expenses.last30Days, color: '#CB0C9F' },
                        { title: 'Sales Last 30 Days', data: sales.last30Days, color: '#8884d8' },
                        { title: 'Purchase Last 30 Days', data: purchase.last30Days, color: '#00A884' },
                        { title: 'Return Last 30 Days', data: returns.last30Days, color: '#CB0C9F' }
                    ].map((item, index) => (
                        <div className='col-lg-6 col-md-12 py-3' key={index}>
                            <div className='card shadow border-0'>
                                <div className='card-body'>
                                    <h5>{item.title}</h5>
                                    {renderAreaChart(item.data, item.color)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;