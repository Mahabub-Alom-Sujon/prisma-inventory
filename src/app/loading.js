export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        //  <div  className="LoadingOverlay">
        //     <div className="Line-Progress">
        //         <div className="indeterminate"></div>
        //     </div>
        // </div>
        <div className="preloder">
            <svg id="loader">
                <path id="corners" d="m 0 12.5 l 0 -12.5 l 50 0 l 0 50 l -50 0 l 0 -37.5" />
                <path id="L" d="m 18 9 l 0 30 l 16 0" />
            </svg>
        </div>
        //<div></div>
    );
}