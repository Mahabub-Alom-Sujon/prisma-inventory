import ExpenseList from '@/components/expense/ExpenseList';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <ExpenseList/>
        </MasterLayout>
    );
};

export default page;