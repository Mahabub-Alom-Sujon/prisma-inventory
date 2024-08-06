import MasterLayout from '@/components/master/MasterLayout';
import ExpenseReport from '@/components/report/ExpenseReport';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <ExpenseReport/>
        </MasterLayout>
    );
};

export default page;