
const name = "account owner"; // need to change after searching

function Payment(){
    return(
        <div>
            <section>
                <label> Search for Members </label>
                <input placeholder="Indunil"/>
                <p>
                        {/* display search results all are selectable */}
                </p>
                <button>ADD</button>

                <div>
                    {/* show the added members */}
                </div>
            </section>

            <section>
                <span>PAYER :</span>
                <span>{name}</span>
                <lable> Search for a payer </lable>
                <input placeholder="Indunil"/>
                <p>
                        {/* display search results all are selectable */}
                </p>
            </section>

            <section>
                <label> Total value </label>
                <input placeholder="500"/>
                <button>confirm</button>
            </section>
        </div>
    );

}

export default Payment;