async function getResponse() {
    const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=kxCBvfyYPIZAIH6KRtBs73SQZIzruyFP7Gu5-DOOQJVVHKNjyCev55POvyEO4_3a83kU6A3KFTM_Vj1yGD1qM9G2aohJnvujm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnANKUp5JH3KIregqqQLw1DBn9_gFn9iEKY2qh5lWyni_HZHbluE3DhXm1Uuo__9p4iQWjAHm0AqupVGZMTzQ2gt28oCFE7XaW9z9Jw9Md8uu&lib=MYyuGE3BfTHytQFcKGLzAWlfO3Y6n6lav");


    const data = await response.json();
    return data;
}

function extractValueCount(data, key) {
    const valueCount = data.reduce((acc, curr) => {
        const value = curr[key];
        if (acc[value]) {
            acc[value] += 1;
        } else {
            acc[value] = 1;
        }
        return acc;
    }, {});
    return valueCount;
}

// Load Google's charting functions
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart(condArray, title, divId) {
    // Set the Google Chart options (title, width, height, and colors can be set)
    var options = {
        title: title,
        'width': 550,
        'height': 400
    };

    // Convert condArray into the DataTable that Google Charts needs and put it in a var
    var data = google.visualization.arrayToDataTable(condArray)

    // Display chart inside of the empty div element using the DataTable and Options set
    var chart = new google.visualization.PieChart(document.getElementById(divId));
    chart.draw(data, options);
}


const responseData = getResponse();
responseData.then((data) => {
    let jenisTransportasi = extractValueCount(data, "Apa jenis tranpsortasi yang anda gunakan untuk pergi ke kampus?");
    jenisTransportasi = Object.entries(jenisTransportasi);
    jenisTransportasi.unshift(["Jenis Transportasi", "Jumlah"]);
    drawChart(jenisTransportasi, "Jenis Transportasi yang digunakan untuk pergi ke kampus", "piechart1");

    let kemacetan = extractValueCount(data, "Apakah saat perjalanan ke kampus pernah terkena macet / melihat kemacetan yang cukup parah?");
    kemacetan = Object.entries(kemacetan);
    kemacetan.unshift(["Kemacetan", "Jumlah"]);
    drawChart(kemacetan, "Apakah sering mengalami kemacetan saat ke kampus?", "piechart2");

    let telat = extractValueCount(data, "Apakah kemacetan tersebut sering membuat Anda telat untuk masuk ke kelas?");
    telat = Object.entries(telat);
    telat.unshift(["Keterlambatan", "Jumlah"]);
    drawChart(telat, "Frekuensi telat akibat kemacetan", "piechart3");
});

