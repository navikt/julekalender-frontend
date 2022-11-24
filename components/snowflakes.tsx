
const Snowflakes = ({flakes}: {flakes: number}) => {
    return <div aria-hidden="true">
        {[...Array(flakes)].map((_, i) => 
            <div key={i} className={`snowflake drop-shadow-[0_2px_2px_rgba(255,255,255,0.25)]`}><img src="/snø.svg" /></div>
        )}
    </div>
}

export default Snowflakes