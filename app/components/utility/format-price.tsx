export default function FormatPrice({ price }: { price: any }) {
    return (
        <>
            {parseFloat(price) === 0
                ? (<span className='px-2 py-1 bg-primary-theme text-white font-bold font-mono uppercase text-xs rounded'>Free</span>)
                : (<>₦{parseInt(price).toLocaleString()}</>)
            }
        </>
    )
}
