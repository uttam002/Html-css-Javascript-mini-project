function getdata() {
    let data = document.querySelector("#inputDate").value;
    let dob = new Date(data);
    let day = dob.getDate();
    let month = dob.getMonth();
    let year = dob.getFullYear();
    return { day, month, year };
}

function getDiff() {
    const currentDate = new Date();
    const { day: Bday, month: Bmonth, year: Byear } = getdata();

    let yd = currentDate.getFullYear() - Byear;
    let md = currentDate.getMonth() - Bmonth;
    let dd = currentDate.getDate() - Bday;

    let years, months, days;

    if ((yd < 0) || (yd === 0 && (md < 0 || (md === 0 && dd < 0)))) {
        years = 0;
        months = 0;
        days = 0;
    } else if (yd === 0 && md > 0 && dd < 0) {
        years=yd;
        months = md - 1;
        days = dd + 30;
    } else if (yd > 0 && md < 0) {
        years = yd - 1;
        months = md + 12;
        if (dd < 0) {
            months = md - 1;
            days = dd + 30;
        }
    } else if (yd > 0 && md === 0 && dd < 0) {
        years = yd - 1;
        months = md + 11;
        days = dd + 30;
    } else if(yd>0 && md>0 && dd<0){
        years=yd;
        months = md-1;
        days = dd+30;
    }else {
        years = yd;
        months = md;
        days = dd;
    }

    return { years, months, days };
}

function showOutput(y, m, d) {
    const yO = document.querySelector("#yearOutput");
    const mO = document.querySelector("#monthOutput");
    const dO = document.querySelector("#dayOutput");

    yO.textContent = `${y}`;
    dO.textContent = `${d}`;
    mO.textContent = `${m}`;
}

function calculate() {
    const { years, months, days } = getDiff();
    showOutput(years, months, days);
}
