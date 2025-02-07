function Repayment(){
    return(
        <div>
            <section>
                <section>
                    {/* only for admins remove for normal users */}
                    <lable>Add Payer</lable>
                    <input></input>
                    <p>
                        {/* display search results all are selectable */}
                    </p>
                    <span>
                        {/* show Payer */}
                    </span>
                </section>
                <section>
                    <lable>Add Payee</lable>
                    <input></input>
                    <p>
                        {/* display search results all are selectable */}
                    </p>
                    <span>
                        {/* show payee */}
                    </span>
                </section>
            </section>

            <section>
                <label htmlFor=""> Payment </label>
                <input type="text" />
                <button> confirm </button>
            </section>


        </div>
    );

}

export default Repayment;