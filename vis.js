//import "convert-csv-to-json";

// Insert Documentation Here
// test1
// 
//input_files = ["2013_January.csv","2013_February.csv","2013_March.csv","2013_April.csv","2013_May.csv","2013_June.csv","2013_July.csv","2013_August.csv","2013_September.csv","2013_October.csv","2013_November.csv","2013_December.csv"];
//input_files = ["2013_December.csv","2013_November.csv","2013_October.csv","2013_September.csv","2013_August.csv"];
//input_files = ["2013_December.csv","2013_November.csv"];
//input_files = ["2013_June.csv"];
//input_files = ["2017_January.csv"];

// input_files = [];
// year = 2017;
// for(var get_f = 0; get_f < monthnames().length; get_f++) {
//     input_files.push(year + "_" + monthnames()[get_f] + ".csv");
// }

//document.addEventListener('DOMContentLoaded', fill_dropdown(), false);
//document.getElementById("plot_select").addEventListener("webkitTransitionEnd", fill_dropdown());

// For multiple files (works for single also)
function parseData(createGraph, plot_type, month_list, basecolor, {category, abscissa, group_by, vertloc, range_length, format, row_select, col_select, curvefit, bins, nsector, bin_arrange} = {}) {

    var all_results = [];
    console.log(month_list);

    load.innerText = "Loading...";

    //for (var k = 0; k < input_files.length; k++) {
    for (var k = 0; k < month_list.length; k++) {
        Papa.parse(month_list[k], {
            download: true,

            complete: function(results) {
                all_results.push(results);

                if (all_results.length == month_list.length) {
                    createGraph(all_results, plot_type, month_list, basecolor, {category: category, abscissa: abscissa, group_by: group_by, vertloc: vertloc, range_length: range_length, format: format, rows: row_select, cols: col_select, curvefit: curvefit, nbins: bins, nsector: nsector, bin_arrange: bin_arrange})
                }

            }

        }); 

    }

}

function testRequest(month_string) {

    var final_data = [];
    var month_mat = [];

    for (var ml = 0; ml < month_string.length; ml++) {

        $.ajax({
        // url: 'https://s3-us-west-2.amazonaws.com/nrel-nwtc-metmast-uni/int/dt=2017-01/2017_January.csv',
        url: 'https://s3-us-west-2.amazonaws.com/nrel-nwtc-metmast-uni/int/' + month_string[ml],
        dataType: 'text',
        success: function(data) {
            final_data.push(data);
        },
        error: function (e) {
            month_mat.push(month_string[ml]);
            setInnerHTML("csv_data", e.error);
        }
        });

    }

    if (final_data.length != month_string.length) {

        var output_message = "";

        for (var f = 0; f < month_mat.length; f++) {
            output_message += (month_mat[f] + " ");
        }

        alert("You are missing the following files:")

    } else {

        return final_data;

    }

}

// Another method (probably quicker with no weird packages, but need a URL first)
// Plotly.d3.csv(rawDataURL, function(error, rawData))

// Calculate the domains of plot
function calcDomain_x(index, N) {

    var pad = 0.02;
    var width = 1 / N;
    
    return [
        index * (width) + pad / 2,
        (index + 1) * (width) - pad / 2
    ];

}

function calcDomain_y(index, N) {

    var pad = 0.02;
    var width = 1 / N;
    
    return [
        1 - ((index + 1) * (width) - pad / 2),
        1 - (index * (width) + pad / 2)
    ];

}

// Get cardinal directions for Wind Rose
function getCardinal(angle, nsector) {
    //easy to customize by changing the number of directions you have 
    
    var directions = nsector;
    
    var degree = 360 / directions;
    angle = angle + degree/2;

    if (nsector === 32) {
    
        if (angle >= 0 * degree && angle < 1 * degree)
            return "N";
        if (angle >= 1 * degree && angle < 2 * degree)
            return "NbE";
        if (angle >= 2 * degree && angle < 3 * degree)
            return "NNE";
        if (angle >= 3 * degree && angle < 4 * degree)
            return "NEbN";
        if (angle >= 4 * degree && angle < 5 * degree)
            return "NE";
        if (angle >= 5 * degree && angle < 6 * degree)
            return "NEbE";
        if (angle >= 6 * degree && angle < 7 * degree)
            return "ENE";
        if (angle >= 7 * degree && angle < 8 * degree)
            return "EbN";
        if (angle >= 8 * degree && angle < 9 * degree)
            return "E";
        if (angle >= 9 * degree && angle < 10 * degree)
            return "EbS";
        if (angle >= 10 * degree && angle < 11 * degree)
            return "ESE";
        if (angle >= 11 * degree && angle < 12 * degree)
            return "SEbE";
        if (angle >= 12 * degree && angle < 13 * degree)
            return "SE";
        if (angle >= 13 * degree && angle < 14 * degree)
            return "SEbS";
        if (angle >= 14 * degree && angle < 15 * degree)
            return "SSE";
        if (angle >= 15 * degree && angle < 16 * degree)
            return "SbE";
        if (angle >= 16 * degree && angle < 17 * degree)
            return "S";
        if (angle >= 17 * degree && angle < 18 * degree)
            return "SbW";
        if (angle >= 18 * degree && angle < 19 * degree)
            return "SSW";
        if (angle >= 19 * degree && angle < 20 * degree)
            return "SWbS";
        if (angle >= 20 * degree && angle < 21 * degree)
            return "SW";
        if (angle >= 21 * degree && angle < 22 * degree)
            return "SWbW";
        if (angle >= 22 * degree && angle < 23 * degree)
            return "WSW";
        if (angle >= 23 * degree && angle < 24 * degree)
            return "WbS";
        if (angle >= 24 * degree && angle < 25 * degree)
            return "W";
        if (angle >= 25 * degree && angle < 26 * degree)
            return "WbN";
        if (angle >= 26 * degree && angle < 27 * degree)
            return "WNW";
        if (angle >= 27 * degree && angle < 28 * degree)
            return "NWbW";
        if (angle >= 28 * degree && angle < 29 * degree)
            return "NW";
        if (angle >= 29 * degree && angle < 30 * degree)
            return "NWbN";
        if (angle >= 30 * degree && angle < 31 * degree)
            return "NNW";
        if (angle >= 31 * degree && angle < 32 * degree)
            return "NbW";

    }

    if (nsector === 16) {

        if (angle >= 0 * degree && angle < 1 * degree)
            return "N";
        if (angle >= 1 * degree && angle < 2 * degree)
            return "NNE";
        if (angle >= 2 * degree && angle < 3 * degree)
            return "NE";
        if (angle >= 3 * degree && angle < 4 * degree)
            return "ENE";
        if (angle >= 4 * degree && angle < 5 * degree)
            return "E";
        if (angle >= 5 * degree && angle < 6 * degree)
            return "ESE";
        if (angle >= 6 * degree && angle < 7 * degree)
            return "SE";
        if (angle >= 7 * degree && angle < 8 * degree)
            return "SSE";
        if (angle >= 8 * degree && angle < 9 * degree)
            return "S";
        if (angle >= 9 * degree && angle < 10 * degree)
            return "SSW";
        if (angle >= 10 * degree && angle < 11 * degree)
            return "SW";
        if (angle >= 11 * degree && angle < 12 * degree)
            return "WSW";
        if (angle >= 12 * degree && angle < 13 * degree)
            return "W";
        if (angle >= 13 * degree && angle < 14 * degree)
            return "WNW";
        if (angle >= 14 * degree && angle < 15 * degree)
            return "NW";
        if (angle >= 15 * degree && angle < 31 * degree)
            return "NNW";

    }

    if (nsector === 8) {

        if (angle >= 0 * degree && angle < 1 * degree)
            return "N";
        if (angle >= 1 * degree && angle < 2 * degree)
            return "NE";
        if (angle >= 2 * degree && angle < 3 * degree)
            return "E";
        if (angle >= 3 * degree && angle < 4 * degree)
            return "SE";
        if (angle >= 4 * degree && angle < 5 * degree)
            return "S";
        if (angle >= 5 * degree && angle < 6 * degree)
            return "SW";
        if (angle >= 6 * degree && angle < 7 * degree)
            return "W";
        if (angle >= 7 * degree && angle < 8 * degree)
            return "NW";

    }

    if (nsector === 4) {

        if (angle >= 0 * degree && angle < 1 * degree)
            return "N";
        if (angle >= 1 * degree && angle < 2 * degree)
            return "E";
        if (angle >= 2 * degree && angle < 3 * degree)
            return "S";
        if (angle >= 3 * degree && angle < 4 * degree)
            return "W";

    }
    
    return "N";
}

function titleCase(str) {

    if (typeof(str) === "string") {

        if (str === "ti") {

            return "TI (Turbulence Intensity)";

        } else if (str === "one_month") {

            return "One Month";

        } else {

            var return_this = str.toLowerCase().split(' ').map(function(word) {
                if (word === "tke") {
                    return "TKE";
                } else if (word === "z/l") {
                    return word;
                } else if (word === "monin-obukhov") {
                    return "Monin-Obukhov";
                } else {
                    return word.replace(word[0], word[0].toUpperCase());
                }
            }).join(' ');

            if (return_this === "Turbulent Kinetic Energy") {

                return "Turbulent Kinetic Energy (TKE)";

            } else {

                return return_this;

            }

        }

    } else {
    
        return str;

    }

}

function plot_types() {

    var plot_type = ["Single Profile", "Extra Profile", "Cumulative Profile", "Stability Profile", "Hourly", "Rose Figure", "Wind Direction Scatter", "Stability Wind Direction Scatter",
                     "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability", "Stacked Histogram by Stability",
                     "Normalized Histogram by Stability"];    

    return plot_type;

}

function extra_data_plots() {

    var plot_type = ["Extra Profile"];    

    return plot_type;

}

function basecolor_plots() {

    var plot_type = ["Single Profile", "Extra Profile", "Cumulative Profile", "Stability Profile", "Hourly", "Rose Figure", "Wind Direction Scatter", "Stability Wind Direction Scatter",
                     "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability", "Stacked Histogram by Stability",
                     "Normalized Histogram by Stability"];    

    return plot_type;

}

function cat_types() {

    var plot_type = ["Single Profile", "Extra Profile", "Cumulative Profile", "Stability Profile", "Hourly", "Rose Figure", "Wind Direction Scatter", "Stability Wind Direction Scatter",
                     "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability", "Stacked Histogram by Stability"];    

    return plot_type;

}

function abscissa_types() {

    var plot_type = ["Grouped Wind Direction Scatter"];    

    return plot_type;

}

function groupby_types() {

    var plot_type = ["Grouped Wind Direction Scatter"];    

    return plot_type;

}

function vertloc_plots() {

    var plot_type = ["Stability Profile", "Rose Figure", "Wind Direction Scatter", "Stability Wind Direction Scatter",
                     "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability", "Stacked Histogram by Stability",
                     "Normalized Histogram by Stability"];

    return plot_type;

}

function range_length_plots() {

    var plot_type = ["Stability Profile", "Hourly", "Wind Direction Scatter", "Grouped Wind Direction Scatter", "Histogram", 
                     "Stacked Histogram by Stability", "Normalized Histogram by Stability"];    

    return plot_type;

}

function one_month_plots() {

    var plot_type = ["Rose Figure", "Stability Wind Direction Scatter", "Histogram by Stability"];

    return plot_type;

}

function bin_plots() {

    var plot_type = ["Rose Figure", "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability"];

    return plot_type;

}    

function sector_plots() {

    var plot_type = ["Rose Figure"];

    return plot_type;

} 

function bin_arrange_plots() {

    var plot_type = ["Rose Figure"];

    return plot_type;

} 

function curvefit_plots() {

    var plot_type = ["Histogram"];

    return plot_type;

}   

function remove_dropdowns(current_id) {

    // var element = document.getElementById("chart");
    // var class_name = element.className;

    // if (class_name === "js-plotly-plot") {

    //     element.innerHTML = "";

    // }

    var ids = document.querySelectorAll('[id]');
    var id_array = Array.prototype.map.call(ids, function(element, anything) {
        return element.id;
    });

    var index_start = id_array.indexOf(current_id);
    var index_end = id_array.indexOf("reset");

    // +1 so you don't remove the current ID
    for (var rma = index_start+1; rma < index_end; rma++) {

        document.getElementById(id_array[rma]).style.display = "none";

        if (document.getElementById(id_array[rma]).type != "file") {

            document.getElementById(id_array[rma]).value = "null";

        }

    }

}

function load_file(inputFiles) {

    // inputFiles.onchange = function(){
    //     var data = [];      // The results
    //     var pending = 0;    // How many outstanding operations we have
    
    //     Array.prototype.forEach.call(inputFiles.files, function(file, index) {

    //         var fr = new FileReader();
    //         fr.onload = function() {
    //             data[index] = fr.result;
    //             --pending;
    //             if (pending == 0) {
    //                 console.log(data);
    //                 // All requests are complete, you're done
    //             }
    //         }
    //         fr.readAsText(file);
    //         ++pending;
    //     });
    // }


    // function read_text(file_to_read) {

    //     return new Promise((resolve, reject) => {
    //         var fr = new FileReader();  
    //         fr.onload = resolve;  // CHANGE to whatever function you want which would eventually call resolve
    //         fr.readAsText(file_to_read);
    //     });

        // const readUploadedFileAsText = (file_to_read) => {
        //     const temporaryFileReader = new FileReader();
          
        //     return new Promise((resolve, reject) => {
        //         temporaryFileReader.onerror = () => {
        //             temporaryFileReader.abort();
        //                 reject(new DOMException("Problem parsing input file."));
        //         };
          
        //         temporaryFileReader.onload = () => {
        //             resolve(temporaryFileReader.result);
        //         };
        //         temporaryFileReader.readAsText(file_to_read);
        //     });
        // };

        // return readUploadedFileAsText();

        // fr.readAsText(file_to_read);

        // return function out() {
            
        //     return fr;

        // };

        // return out;

    // }

    //var fr = new FileReader();        
    //fr.onload = receivedText;
    // file.onchange = function(){
    //     var promise = Promise.resolve();
    //     file.files.map( file0 => promise.then(()=> read_text(file0)));
    //     promise.then(() => console.log(file0));
    // }
    //var test_this = read_text(file);

    // function receivedText() {

    // }

    //console.log(test_this);

    //return test_this;
    
}

function get_cats() {

    var plot_type = ["Single Profile", "Extra Profile", "Cumulative Profile", "Stability Profile", "Hourly", "Rose Figure", "Wind Direction Scatter", "Stability Wind Direction Scatter",
                     "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability", "Stacked Histogram by Stability",
                     "Normalized Histogram by Stability"]; 
                     
    var cat_obj = {};

    for (var g = 0; g < plot_type.length; g++) {

        if (plot_type[g] === "Extra Profile") {

            cat_obj[plot_type[g]] = cat_extra();

        } else {

            cat_obj[plot_type[g]] = categories_to_keep();

        }

    }

    return cat_obj;

}

function get_range(plot_type) {

    // var plot_type = ["Single Profile", "Extra Profile", "Cumulative Profile", "Stability Profile", "Hourly", "Rose Figure", "Wind Direction Scatter", "Stability Wind Direction Scatter",
    //                  "Grouped Wind Direction Scatter", "Histogram", "Histogram by Stability", "Stacked Histogram by Stability",
    //                  "Normalized Histogram by Stability"]; 
                     
    var range_obj = {};

    if (one_month_plots().indexOf(plot_type) === -1) {

        range_obj["One Month"] = "one_month";
        range_obj["Multiple Months"] = "multiple";

    } else {

        range_obj["One Month"] = "one_month";

    }

    return range_obj;

}

function get_plot_inputs(pt, rl) {

    var basecolor = "color_select";
    var category = "category_select";
    var abscissa = "abscissa_select";
    var group_by = "group-by_select";
    var vertloc = "vertloc_select";
    var range_length = "range_length_select";
    var format = "format_select";
    var row = "row_select";
    var col = "col_select";
    var curvefit = "curvefit_select";
    var bins = "bin_select";
    var nsector = "sector_select";
    var bin_arrange = "bin-arrange_select";

    var plot_inputs_obj = {};
    var all_plot_types = plot_types();

    for (var p = 0; p < all_plot_types.length; p++) {

        plot_inputs_obj[all_plot_types[p]] = [];

        if (basecolor_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(basecolor);

        }

        if (cat_types().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(category);

        }

        if (abscissa_types().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(abscissa);
            
        }

        if (groupby_types().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(group_by);
            
        }

        if (vertloc_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(vertloc);
            
        }

        if (range_length_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(range_length);

            if (rl === "multiple") {

                plot_inputs_obj[all_plot_types[p]].push(format);
                plot_inputs_obj[all_plot_types[p]].push(row);
                plot_inputs_obj[all_plot_types[p]].push(col);

            }
            
        }

        if (curvefit_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(curvefit);
            
        }

        if (bin_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(bins);
            
        }

        if (sector_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(nsector);
            
        }

        if (bin_arrange_plots().indexOf(all_plot_types[p]) != -1) {

            plot_inputs_obj[all_plot_types[p]].push(bin_arrange);
            
        }

    }

    var plot_input_list = plot_inputs_obj[pt];

    return plot_input_list;

}

function fill_dropdown_plot() {

    if (document.getElementById("plot_select").style.display === "inline") {

        var plot_list = document.getElementById("plot_select");

        if (plot_list.options.length < plot_types().length) {

            for (var plot = 0; plot < plot_types().length; plot++) {
                plot_list.options[plot_list.options.length] = new Option(plot_types()[plot],plot_types()[plot]);         
            }

        }  

        var plot_type = document.getElementById("plot_select").value;

    }

}

function fill_dropdown_cats() {

    var fill_cats = ["category_select", "abscissa_select", "group-by_select"];

    for (var f = 0; f < fill_cats.length; f++) {

        if (document.getElementById(fill_cats[f]).style.display === "inline") {

            var cat_list = document.getElementById(fill_cats[f]);
            var plot_type = document.getElementById("plot_select").value;

            var list_length = cat_list.options.length;

            var text_here = titleCase(fill_cats[f].split("_")[0]); 

            while (list_length > 0) {
    
                document.getElementById(fill_cats[f]).remove(0);
                var list_length = cat_list.options.length;

            }  

            cat_list.options[cat_list.options.length] = new Option("Select "+text_here,"null"); 

            if (extra_data_plots().indexOf(plot_type) != -1) {     

                for (var cat = 0; cat < cat_extra().length; cat++) {
                    cat_list.options[cat_list.options.length] = new Option(titleCase(cat_extra()[cat]),cat_extra()[cat]);         
                }

            } else {
    
                for (var cat = 0; cat < categories_to_keep().length; cat++) {
                    cat_list.options[cat_list.options.length] = new Option(titleCase(categories_to_keep()[cat]),categories_to_keep()[cat]);         
                } 

            }

        }

    }

}

// not required
// function fill_dropdown_range() {

//     if (document.getElementById("range_length_select").style.display === "inline") {

//         var cat_list = document.getElementById("range_length_select");
//         const limit = 2;

//         if (cat_list.options.length < limit) {

//             var plot_type = document.getElementById("plot_select");

//             if (one_month_plots().indexOf(plot_type) === -1) {

//                 cat_list.options[cat_list.options.length] = new Option("Multiple","multiple"); 
//                 cat_list.options[cat_list.options.length] = new Option("One Month","one_month");

//             } else {

//                 cat_list.options[cat_list.options.length] = new Option("One Month","one_month"); 

//             }

//         }

//     }

// }

function fill_dropdown_month() {

    var fill_months = ["month_select", "start_month_select", "end_month_select"];

    for (var f = 0; f < fill_months.length; f++) {

        if (document.getElementById(fill_months[f]).style.display === "inline") {

            var month_list = document.getElementById(fill_months[f]);

            if (month_list.options.length < monthnames().length) {

                var months = monthnames();

                for (var month = 0; month < months.length; month++) {

                    month_list.options[month_list.options.length] = new Option(months[month],months[month]); 

                }

            }

        }

    }

}

function fill_dropdown_year() {

    var fill_years= ["year_select", "start_year_select", "end_year_select"];

    for (var f = 0; f < fill_years.length; f++) {

        if (document.getElementById(fill_years[f]).style.display === "inline") {

            var year_list = document.getElementById(fill_years[f]);

            if (year_list.options.length < yearnames().length) {

                var years = yearnames();

                for (var year = 0; year < years.length; year++) {

                    year_list.options[year_list.options.length] = new Option(years[year],years[year]); 

                }

            }

        }

    }

}

function fill_dropdown_sector() {

    if (document.getElementById("sector_select").style.display === "inline") {

        document.getElementById("bin-arrange_select").style.display = "inline";

        var sector_list = document.getElementById("sector_select");
        var fill_sectors = ["4","8","16","32"];

        if (sector_list.options.length < fill_sectors.length) {

            for (var sector = 0; sector < fill_sectors.length; sector++) {

                sector_list.options[sector_list.options.length] = new Option(fill_sectors[sector],fill_sectors[sector]); 

            }

        }

    }

}

function fill_dropdown_bina() {

    if (document.getElementById("bin-arrange_select").style.display === "inline") {

        document.getElementById("color_select").style.display = "inline";

        var bin_arrange_list = document.getElementById("bin-arrange_select");
        var fill_bin_arrange = ["Linear", "Inverse-Log"];

        if (bin_arrange_list.options.length < fill_bin_arrange.length) {

            for (var ba = 0; ba < fill_bin_arrange.length; ba++) {

                bin_arrange_list.options[bin_arrange_list.options.length] = new Option(fill_bin_arrange[ba],fill_bin_arrange[ba]); 

            }

        }

    }

}

function fill_dropdown_curvefit() {

    if (document.getElementById("curvefit_select").style.display === "inline") {

        var curvefit_list = document.getElementById("curvefit_select");
        var curvefit_arrange = ["None", "Exponential", "Rayleigh", "Lognormal", "Normal", "Weibull"];

        if (curvefit_list.options.length < curvefit_arrange.length) {

            for (var cf = 0; cf < curvefit_arrange.length; cf++) {

                curvefit_list.options[curvefit_list.options.length] = new Option(curvefit_arrange[cf],curvefit_arrange[cf]); 

            }

        }

    }

}

function fill_dropdown_color() {

    if (document.getElementById("color_select").style.display === "inline") {

        var color_list = document.getElementById("color_select");
        var range_type = document.getElementById("range_length_select").value;

        // fix this later after testing
        // if (range_type === "one_month") {

        //     var color_arrange = ["Red", "Green", "Blue", "Gray"];

        // } else {

        //     var color_arrange = ["Red", "Green", "Blue", "Gray", "Cycle", "Span"];

        // }

        var color_arrange = ["red", "green", "blue", "gray", "cycle", "span"];

        if (color_list.options.length < color_arrange.length) {

            for (var ca = 0; ca < color_arrange.length; ca++) {

                color_list.options[color_list.options.length] = new Option(titleCase(color_arrange[ca]),color_arrange[ca]); 

            }

        }

    }

}

function fill_dropdown_row() {
    
    var cat_list = document.getElementById("row_select");
    var list_length = cat_list.options.length;

    while (list_length > 0) {

        document.getElementById("row_select").remove(0);
        var list_length = document.getElementById("row_select").options.length;

    }  

    cat_list.options[cat_list.options.length] = new Option("Select Number of Rows","null"); 

    var plot_type = document.getElementById("plot_select").value;
    var start_month = String(document.getElementById("start_month_select").value);
    var start_year = parseInt(document.getElementById("start_year_select").value);
    var end_month = String(document.getElementById("end_month_select").value);
    var end_year = parseInt(document.getElementById("end_year_select").value);

    var month_list = get_file_range(plot_type, start_month, start_year, end_month, end_year);

    var combos = get_grid_format(month_list.length);
    var select_row = document.getElementById("row_select");
    
    var combo_list = [];
    for (var c = 0; c < Object.keys(combos).length; c++) {
        combo_list.push(combos[Object.keys(combos)[c]][0]);
    }
 
    if (select_row.options.length <= Object.keys(combos).length) {

        for (var c = 0; c < Object.keys(combos).length; c++) {
            select_row.options[select_row.options.length] = new Option("" + combos[Object.keys(combos)[c]][0], combos[Object.keys(combos)[c]][0]);
        }

    }

    document.getElementById("col_select").value = "null";
    
}

function fill_dropdown_col() {

    var cat_list = document.getElementById("col_select");
    var list_length = cat_list.options.length;

    while (list_length > 0) {

        document.getElementById("col_select").remove(0);
        var list_length = document.getElementById("col_select").options.length;

    }  

    cat_list.options[cat_list.options.length] = new Option("Select Number of Columns","null"); 

    var plot_type = document.getElementById("plot_select").value;
    var start_month = String(document.getElementById("start_month_select").value);
    var start_year = parseInt(document.getElementById("start_year_select").value);
    var end_month = String(document.getElementById("end_month_select").value);
    var end_year = parseInt(document.getElementById("end_year_select").value);

    var month_list = get_file_range(plot_type, start_month, start_year, end_month, end_year);

    var combos = get_grid_format(month_list.length);
    var select_row = document.getElementById("row_select");
    var select_col = document.getElementById("col_select");
    
    var combo_list = [];
    for (var c = 0; c < Object.keys(combos).length; c++) {
        combo_list.push(combos[Object.keys(combos)[c]][0]);
    }

    n1r = document.getElementsByName("row_select");
    n2r = Array.prototype.slice.call(n1r);
    n3r = n2r[0].childNodes.length;

    n1c = document.getElementsByName("col_select");
    n2c = Array.prototype.slice.call(n1c);
    n3c = n2c[0].childNodes.length;

    if ((n3r <= (3 + combo_list.length)) && (n3c <= 3)) {

        var group_in = 0;
        for (var gi = 0; gi < Object.keys(combos).length; gi++) {

            if (combos[Object.keys(combos)[gi]][0] === parseInt(select_row.value)) {
                group_in = gi;
                select_col.options[select_col.options.length] = new Option("" + combos[""+group_in][1], combos[""+group_in][1]);
            }

        }
        
    }
    
}

function data_select() {

    remove_dropdowns("pre_select");
    var pre_data = document.getElementById("pre_select").value;

    if (pre_data === "yes") {

        document.getElementById("files_select_label").style.display = "inline";    
        document.getElementById("files_select").style.display = "inline";         

        var user_files = document.getElementById("files_select"); 

        user_files.onchange = function(){

            var data = [];      
            var pending = 0;   
        
            Array.prototype.forEach.call(user_files.files, function(file, index) {

                var fr = new FileReader();
                fr.onload = function() {
                    data[index] = fr.result;
                    --pending;
                    if (pending == 0) {
   
                        load.innerText = "Loading...";

                        for (var streams = 0; streams < data.length; streams++) {
                            if (data[streams].charAt(0) === "[") {
                                graphish_data = data[streams];
                            } else {
                                layout_data = data[streams];
                            }
                        }

                        var graphish = JSON.parse(graphish_data);
                        var layout = JSON.parse(layout_data);

                        Plotly.newPlot("chart", graphish, layout)

                        load.innerText += "Done!";

                    }
                }
                fr.readAsText(file);
                ++pending;
            });

        }

    } else if (pre_data === "no") {
 
        document.getElementById("plot_select").style.display = "inline";    

    } 

}

function plot_select(plot_type) {

    remove_dropdowns("plot_select");
    var plot_type = document.getElementById("plot_select").value;

    if (extra_data_plots().indexOf(plot_type) != -1) {

        document.getElementById("category_select").style.display = "none";

    } else {

        document.getElementById("category_select").style.display = "none";

    }

    if (cat_types().indexOf(plot_type) != -1) {

        document.getElementById("category_select").style.display = "inline";

    } else {

        document.getElementById("vertloc_select").style.display = "inline";

    }

}

function category_select() {

    var plot_type = document.getElementById("plot_select").value;

    if (abscissa_types().indexOf(plot_type) != -1) {

        document.getElementById("abscissa_select").style.display = "inline";

    } else {

        document.getElementById("vertloc_select").style.display = "inline";

    }

}

function abscissa_select() {

    var plot_type = document.getElementById("plot_select").value;

    document.getElementById("group-by_select").style.display = "inline";


}

function groupby_select() {

    var plot_type = document.getElementById("plot_select").value;

    if (vertloc_plots().indexOf(plot_type) === -1) {

        document.getElementById("range_length_select").style.display = "inline";

    } else {

        document.getElementById("vertloc_select").style.display = "inline";

    }

}

function vertloc_select() {

    var plot_type = document.getElementById("plot_select").value;

    if (one_month_plots().indexOf(plot_type) === -1) {

        document.getElementById("range_length_select").style.display = "inline";

    } else {

        document.getElementById("month_select").style.display = "inline";

    }

}

function range_length_select() {

    var range_length = document.getElementById("range_length_select").value;
    remove_dropdowns("range_length_select");

    if (range_length === "one_month") {

        document.getElementById("month_select").style.display = "inline";

    } else {

        document.getElementById("start_month_select").style.display = "inline";

    }

}

function month_select() {

    document.getElementById("year_select").style.display = "inline";

}

function year_select() {

    var plot_type = document.getElementById("plot_select").value;

    if (bin_plots().indexOf(plot_type) != -1) {

        document.getElementById("bin_select").style.display = "inline";

    } else {

        document.getElementById("color_select").style.display = "inline";

    }

}

function start_month_select() {

    document.getElementById("start_year_select").style.display = "inline";
    document.getElementById("row_select").value = "null";
    document.getElementById("col_select").value = "null";

}

function start_year_select() {

    document.getElementById("end_month_select").style.display = "inline";
    document.getElementById("row_select").value = "null";
    document.getElementById("col_select").value = "null";

}

function end_month_select() {

    document.getElementById("end_year_select").style.display = "inline";
    document.getElementById("row_select").value = "null";
    document.getElementById("col_select").value = "null";

}

function end_year_select() {

    document.getElementById("format_select").style.display = "inline";
    document.getElementById("row_select").value = "null";
    document.getElementById("col_select").value = "null";

}

function format_select() {

    var format = document.getElementById("format_select").value;

    if (format === "grid") {

        document.getElementById("row_select").style.display = "inline";

    } else {

        document.getElementById("color_select").style.display = "inline";

    }

}

function row_select() {

    document.getElementById("col_select").style.display = "inline";

}

function col_select() {

    document.getElementById("color_select").style.display = "inline";

}

// curvefit with added filter for one month only ... at least for now
function bin_select() {

    var plot_type = document.getElementById("plot_select").value;

    if (sector_plots().indexOf(plot_type) != -1) {

        document.getElementById("sector_select").style.display = "inline";

    } else if (curvefit_plots().indexOf(plot_type) != -1) {

        document.getElementById("curvefit_select").style.display = "inline";

    } else {

        document.getElementById("color_select").style.display = "inline";

    }

}

function sector_select() {

    //var plot_type = document.getElementById("plot_select").value;

    document.getElementById("bin-arrange_select").style.display = "inline";

}

function bin_arrange_select() {

    //var plot_type = document.getElementById("plot_select").value;

    document.getElementById("color_select").style.display = "inline";

}

function curvefit_select() {

    //var plot_type = document.getElementById("plot_select").value;

    document.getElementById("color_select").style.display = "inline";

}

function color_select() {

    //var plot_type = document.getElementById("plot_select").value;
    
    document.getElementById("start_plot").style.display = "inline";

}

function prev_plot() {

    var table_state = document.getElementById("prev_chart").style.display;
    
    if (table_state === "none") {

        load.innerText = "Loading...";

        document.getElementById("prev_chart").style.display = "inline";

        var plotly_info = state_saver2.getState();
        var graphish = plotly_info[0];
        var layout = plotly_info[1];

        Plotly.newPlot("prev_chart", graphish, layout)

        load.innerText += "Done!";

    } else {

        document.getElementById("prev_chart").style.display = "none";

    }

}

function prev_sel() {

    var table_state = document.getElementById("var_table").style.display;
    
    if (table_state === "none") {

        document.getElementById("var_table").style.display = "inline";

    } else {

        document.getElementById("var_table").style.display = "none";

    }

}

function start_plot(start_type) {

    // var ids = document.querySelectorAll('[id]');
    // var id_array = Array.prototype.map.call(ids, function(element, anything) {
    //     return element.id;
    // });

    // var start_ind = id_array.indexOf("plot_select");
    // var end_ind = id_array.indexOf("start_plot");

    var pt = document.getElementById("plot_select").value;
    var rl = document.getElementById("range_length_select").value;

    var id_array = get_plot_inputs(pt, rl);
    var alerts = 0;
    var middle_string_list = [];

    for (var loop = 0; loop < id_array.length; loop++) {

        if (document.getElementById(id_array[loop]).value === "null") {

            alerts += 1;

            var num_splits = id_array[loop].split("_").length - 1;
            var middle_string = "";

            for (var i = 0; i < num_splits; i++) {

                middle_string += titleCase(id_array[loop].split("_")[i]);

                if (num_splits > 1) {

                    middle_string += " ";

                }

            }

            middle_string_list.push(middle_string);

        }

    }

    if (alerts === 0) {

        var element = document.getElementById("chart");
        var class_name = element.className;
    
        if (class_name === "js-plotly-plot") {
    
            element.innerHTML = "";
    
        }

        var plot_type = document.getElementById("plot_select").value;

        if (one_month_plots().indexOf(plot_type) != -1) {

            var range_length = "one_month";

        } else {

            var range_length = document.getElementById("range_length_select").value;

        }

        if (range_length === "one_month") {

            var month_final = String(document.getElementById("month_select").value);
            var year_final = String(document.getElementById("year_select").value);

            if (plot_type === "Extra Profile") {

                var input_file_string = year_final + "_" + month_final + "_E.csv";

            } else {

                var input_file_string = year_final + "_" + month_final + ".csv";
            
            }

            var input_file_list = [];
            console.log(input_file_string);
            input_file_list.push(input_file_string);

        } else {

            var plot_type = document.getElementById("plot_select").value;
            var start_month = String(document.getElementById("start_month_select").value);
            var start_year = parseInt(document.getElementById("start_year_select").value);
            var end_month = String(document.getElementById("end_month_select").value);
            var end_year = parseInt(document.getElementById("end_year_select").value);
        
            var input_file_list = get_file_range(plot_type, start_month, start_year, end_month, end_year);

        }

        var basecolor = document.getElementById("color_select").value;
        var category = document.getElementById("category_select").value;
        var abscissa = document.getElementById("abscissa_select").value;
        var group_by = document.getElementById("group-by_select").value;
        var vertloc = document.getElementById("vertloc_select").value;
        var format = document.getElementById("format_select").value;
        var row = document.getElementById("row_select").value;
        var col = document.getElementById("col_select").value;
        var curvefit = document.getElementById("curvefit_select").value;
        var bins = document.getElementById("bin_select").value;
        var nsector = document.getElementById("sector_select").value;
        var bin_arrange = document.getElementById("bin-arrange_select").value;

        parseData(createGraph, plot_type, input_file_list, basecolor, {category: category, abscissa: abscissa, group_by: group_by, vertloc: vertloc, range_length: range_length, format: format, row_select: row_select, col_select: col_select, curvefit: curvefit, bins: bins, nsector: nsector, bin_arrange: bin_arrange});
        
    } else {

        var final_string = "";

        if (middle_string_list.length > 1) {
    
            for (var ms = 0; ms < middle_string_list.length; ms++) {
    
                if (ms === (middle_string_list.length-1)) {
    
                    final_string += (middle_string_list[ms]);
    
                } else {
    
                    final_string += (middle_string_list[ms] + " and ");
    
                }
    
            }
    
        } else {
    
            final_string = middle_string_list[0];
    
        }
    
        alert('Missing "' + final_string + '" Dropdown Input');

    }

}

function get_file_range(plot_type, start_month, start_year, end_month, end_year) {

    var file_list = [];
    var mn = monthnames();

    var start_ind = mn.indexOf(start_month);
    var end_ind = mn.indexOf(end_month);
    var total_months = ((end_year - start_year) * 12) + (end_ind - start_ind);
    
    var year_ind = start_year;
    var month = start_month;
    
    var month_ind = mn.indexOf(start_month);

    for (var im = 0; im < total_months; im++) {
        month_ind = month_ind % 12;
        
        if ((month_ind === 0) && (im != 0)) {
            year_ind += 1;
        }

        if (extra_data_plots().indexOf(plot_type) != -1) {

            file_list.push(year_ind + "_" + mn[month_ind] + "_E.csv");

        } else {

            file_list.push(year_ind + "_" + mn[month_ind] + ".csv");

        }

        month_ind += 1;

    }

    if (extra_data_plots().indexOf(plot_type) != -1) {

        file_list.push(end_year + "_" + end_month + "_E.csv");

    } else {
    
        file_list.push(end_year + "_" + end_month + ".csv");

    }

    return file_list;

}

function get_grid_format(graph_total) {

    var factors = [];
    var quotient = 0;
  
    for (var i = 1; i <= graph_total; i++){
        quotient = graph_total/i;
  
        if (quotient === Math.floor(quotient)){
            factors.push(i); 
        }

    }

    if ((factors.length === 2) && (graph_total > 3)) {

        var quotient = 0;
      
        for (var i = 1; i <= (graph_total+1); i++){
            quotient = (graph_total+1)/i;
      
            if (quotient === Math.floor(quotient) && (i != 1) & (i != graph_total+1)) {
                factors.push(i); 
            }
    
        }

    }

    var factor_dict = {};
    factors.sort(function(a, b) {return a - b;});

    for (var f = 0; f < factors.length/2; f++) {
        factor_dict[""+(f*2)] = [factors[f],factors[factors.length-f-1]];
        factor_dict[""+((f*2)+1)] = [factors[f],factors[factors.length-f-1]].reverse();
    }

    return factor_dict;

}

// For multiple files (works for single also) 
function createGraph(all_results, plot_type, new_files, basecolor, {category, abscissa, group_by, vertloc, range_length, format, rows, cols, curvefit, nbins, nsector, bin_arrange} = {}) { 

    var rows = parseInt(rows);
    var cols = parseInt(cols);
    var nbins = parseInt(nbins);
    var nsector = parseInt(nsector);

    ////////////////////////////////////////////////////
    var table_obj = {
        "Plot Type": plot_type,
        "Category": category,
        "Abscissa": abscissa,
        "Group-By": group_by,
        "Vertical Location": vertloc,
        "Range Length": range_length,
        "Format": format,
        "Rows": rows,
        "Columns": cols,
        "Bins": nbins,
        "Sectors": nsector,
        "Bin-Arrange": bin_arrange,
        "Curvefit": curvefit,
        "Color": basecolor
    }

    if (range_length === "multiple") {

        table_obj["Start Month"] = new_files[0].split("_")[1].split(".")[0];
        table_obj["Start Year"] = new_files[0].split("_")[0];
        table_obj["End Month"] = new_files[new_files.length-1].split("_")[1].split(".")[0];
        table_obj["End Year"] = new_files[new_files.length-1].split("_")[0];

    } else {

        table_obj["Month"] =  new_files[0].split("_")[1].split(".")[0];
        table_obj["Year"] = new_files[0].split("_")[0];

    }
    
    var table = document.getElementById("var_table");
    table.innerHTML = '<tr><th colspan = "2"> Previous Selections </th></tr>';

    for (var t = 0; t < Object.keys(table_obj).length; t++) {

        if ((table_obj[Object.keys(table_obj)[t]] != "null") && (typeof(table_obj[Object.keys(table_obj)[t]]) === "string")) {

            var new_row = table.insertRow(table.rows.length);
            new_row.insertCell(0).innerHTML = Object.keys(table_obj)[t];
            new_row.insertCell(1).innerHTML = titleCase(table_obj[Object.keys(table_obj)[t]]);

        }

    }
    ////////////////////////////////////////////////////

    var graphish, layout;

    if (plot_type === "Single Profile") {

        [graphish, layout] = single_prof(all_results, new_files, category, basecolor);

    }

    if (plot_type === "Extra Profile") {

        [graphish, layout] = extra_prof(all_results, new_files, category, basecolor);

    }

    if (plot_type === "Cumulative Profile") {

        [graphish, layout] = cumulative_prof(all_results, new_files, category, basecolor);

    }

    if (plot_type === "Stability Profile") {

        if (range_length === "one_month") {
            [graphish, layout] = stab_prof(all_results, new_files, category, vertloc, basecolor);
        }
        if (range_length === "multiple") {
            [graphish, layout] = monthly_stab_prof(all_results, new_files, category, vertloc, basecolor, format, {rows: rows, cols: cols});
        }

    }

    if (plot_type === "Hourly") {

        if (range_length === "one_month") {
            [graphish, layout] = hourly(all_results, new_files, category, basecolor);
        }
        if (range_length === "multiple") {
            [graphish, layout] = monthly_hourly(all_results, new_files, category, basecolor, format, rows, cols);
        }

    }

    if (plot_type === "Rose Figure") {

        [graphish, layout] = rose_fig(all_results, new_files, category, vertloc, basecolor, nbins, bin_arrange, nsector);

    }

    if (plot_type === "Wind Direction Scatter") {

        if (range_length === "one_month") {
            [graphish, layout] = winddir_scatter(all_results, new_files, category, vertloc, basecolor);
        }
        if (range_length === "multiple") {
            [graphish, layout] = monthly_winddir_scatter(all_results, new_files, category, vertloc, basecolor, format, rows, cols);
        }

    }

    if (plot_type === "Stability Wind Direction Scatter") {

        [graphish, layout] = stab_winddir_scatter(all_results, new_files, category, vertloc, basecolor);        

    }

    if (plot_type === "Grouped Wind Direction Scatter") {

        if (range_length === "one_month") {
            [graphish, layout] = groupby_winddir_scatter(all_results, new_files, category, abscissa, group_by, vertloc, basecolor, nbins);
        }
        if (range_length === "multiple") {
            [graphish, layout] = monthly_groupby_winddir_scatter(all_results, new_files, category, abscissa, group_by, vertloc, basecolor, nbins, format, rows, cols);
        }

    }

    if (plot_type === "Histogram") {

        if (range_length === "one_month") {
            [graphish, layout] = hist(all_results, new_files, category, vertloc, basecolor, nbins, curvefit);
        }
        if (range_length === "multiple") {
            [graphish, layout] = monthly_hist(all_results, new_files, category, vertloc, basecolor, nbins, format, rows, cols);
        }

    }

    if (plot_type === "Histogram by Stability") {
        
        [graphish, layout] = hist_by_stab(all_results, new_files, category, vertloc, basecolor, nbins);

    }

    if (plot_type === "Stacked Histogram by Stability") {

        if (range_length === "one_month") {

            [graphish, layout] = stacked_hist_by_stab(all_results, new_files, category, vertloc, basecolor);
        }
        if (range_length === "multiple") {

            [graphish, layout] = monthly_stacked_hist_by_stab(all_results, new_files, category, vertloc, basecolor, format, rows, cols);
        }

    }

    if (plot_type === "Normalized Histogram by Stability") {

        if (range_length === "one_month") {
            [graphish, layout] = norm_hist_by_stab(all_results, new_files, vertloc, basecolor);
        }

        if (range_length === "multiple") {
            [graphish, layout] = monthly_norm_hist_by_stab(all_results, new_files, vertloc, basecolor, format, rows, cols);
        }

    }

    // console.log(graphish);
    // console.log(layout);

    Plotly.newPlot("chart", graphish, layout)
    load.innerText += "Done!";

    document.getElementById("save").style.display = "inline";
    document.getElementById("prev_sel").style.display = "inline";
    state_saver2.changeState(state_saver.getState());
    state_saver.changeState([graphish,layout]);

}
    
// Reload the page if required
function reloadPage() {

    location.reload();

}

// Save state 

var state_saver = (function () {
    var state; 

    var pub = {};

    pub.changeState = function (newstate) {
        state = newstate;
    };

    pub.getState = function() {
        return state;
    }

    return pub; 
}());

var state_saver2 = (function () {
    var state; 

    var pub = {};

    pub.changeState = function (newstate) {
        state = newstate;
    };

    pub.getState = function() {
        return state;
    }

    return pub; 
}());

function download(filename, text) {

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

function save_state() {

    var plotly_info = state_saver.getState();
    var graphish = plotly_info[0];
    var layout = plotly_info[1]

    var json_graphish = JSON.stringify(graphish);
    var json_layout = JSON.stringify(layout);

    var date_obj = new Date();
    var time_info = date_obj.getTime();

    var name_graphish = "graphish_" + time_info + ".json";
    var name_layout = "layout_" + time_info + ".json";

    // Harder and less dynamic
    // var fs = require("fs");
    // fs.writeFile("graphish_"+time_info+".json", json_graphish, "utf8", callback);
    // fs.writeFile("layout_"+time_info+".json", json_layout, "utf8", callback);

    download(name_graphish, json_graphish);
    download(name_layout, json_layout);

}

//parseData(createGraph,input_files)

///////////////////////////////////////////////////////////////

function process_extra(all_results, j) {

    // Convert CSV to JSON ... need to create dynamic labels in
    // place of 7 and 10
    var arrays = all_results[j].data;
    var keys = arrays[0];
    var values = arrays.slice(1);

    // To display the data columns and values
    // console.log(keys);
    // console.log(values);

    var object1 = new Object();
    // remove -1 in code with QC data
    for (k = 0; k < keys.length; k++) {
        var new_values = [];
        for (v = 0; v < values.length; v++) {
            new_values.push(values[v][k]);
        }
        if (Object.keys(object1).indexOf(keys[k]) == -1) {
            object1[keys[k]] = new_values;
        } else {
            object1[keys[k]+"_adv"] = new_values;
        }
    }  
    
    return object1;

}

function process_data(all_results, j) {

    // Convert CSV to JSON ... need to create dynamic labels in
    // place of 7 and 10
    var arrays = all_results[j].data;
    var keys = arrays[7];
    var values = arrays.slice(10);

    // To display the data columns and values
    // console.log(keys);
    // console.log(values);

    var object1 = new Object();
    // remove -1 in code with QC data
    for (k = 0; k < (keys.length-1); k++) {
        var new_values = [];
        for (v = 0; v < values.length; v++) {
            new_values.push(values[v][k]);
        }
        if (Object.keys(object1).indexOf(keys[k]) == -1) {
            object1[keys[k]] = new_values;
        } else {
            object1[keys[k]+"_adv"] = new_values;
        }
    }  
    
    return object1;

}

function filter_data(dat) {

    //var dat0 = dat.split(",").map(Number);

    var new_dat = [];

    for (var d = 0; d < dat.length; d++) {

        if (((typeof(dat[d]) === "string") | typeof(dat[d]) === "number") && (dat[d] != -999) && (isNaN(dat[d]) === false)) {

            new_dat.push(parseFloat(dat[d]));

        }

    }

    return new_dat;
}

// Single Profile
// Any-month - not yet

function single_prof(all_results, input_files, category, basecolor) {
    // default: -,-,-,span

    // console.log("here");
    // console.log(all_results);
    // console.log(input_files);
    // console.log(category);
    // console.log(basecolor);
    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity;
    var margin = 0.25;
    
    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);
        var object2 = edit_met_data(object1);
        console.log(object2);
        var cate_info = get_catinfo(object2);
        
        var x_dat_length = object2["Date"].length;
        var x_dat = [];

        for (var d = 0; d < x_dat_length; d++) {
            x_dat.push(d);
        }

        console.log(cate_info["columns"][category]);

        var y_dat = object1[cate_info["columns"][category][0]]; // for now

        console.log(x_dat);
        console.log(y_dat);

        //     var maxdat = plotdat.filter(Boolean);

        //     if (Math.max(...maxdat) > max_x) {
        //         max_x = Math.max(...maxdat);
        //     }

        //     if (Math.min(...maxdat) < min_x) {
        //         min_x = Math.min(...maxdat);
        //     }

        if (input_files.length > 1) {

            var colors = get_colors(input_files.length, {basecolor: basecolor});

        } else {

            var colors = get_nrelcolors()[basecolor];

        }

        var trace = {
            x: x_dat,
            xcalender: "%x",
            y: y_dat,
            //ycalendar: gregorian,
            type: "scatter",
            name: input_files[j].split("_")[1],
            connectgaps: true,
            line: {
                color: colors[j]
            }
        };

        graphish[j] = trace;

    }

    // // Set the string labels
    var xstring = "Date";
    var ystring = "$$" + object1[category] + "$$";
    // need to add $$ for LaTeX to process
    var title_string = "\\text{ "+ xstring + " vs. }" + ystring; 

    // var diff = max_x - min_x;

    var layout = {
        font: {
            size: 20
        },
        title: title_string,
        yaxis: {
            title: ystring
        },
        xaxis: {
            title: xstring,
        },
        //hovermode: "closest"
    };

    return [graphish, layout];

}

// Cumulative and Monthly Profile
// Any-month

function extra_prof(all_results, input_files, category, basecolor) {
    // default: -,-,-,span

    // console.log("here");
    // console.log(all_results);
    // console.log(input_files);
    // console.log(category);
    // console.log(basecolor);
    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity;
    var margin = 0.25;
    
    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_extra(all_results, j);
        // console.log(object1);
        
        // var x_dat = object1["DATE (MM/DD/YYYY)"]; // "%x" = "%m%d%Y"
        
        var x_dat_length = object1["DATE (MM/DD/YYYY)"];
        var x_dat = [];

        for (var d = 0; d < x_dat_length.length; d++) {
            x_dat.push(d);
        }

        var y_dat = object1[category];

        //     var maxdat = plotdat.filter(Boolean);

        //     if (Math.max(...maxdat) > max_x) {
        //         max_x = Math.max(...maxdat);
        //     }

        //     if (Math.min(...maxdat) < min_x) {
        //         min_x = Math.min(...maxdat);
        //     }

        if (input_files.length > 1) {

            var colors = get_colors(input_files.length, {basecolor: basecolor});

        } else {

            var colors = get_nrelcolors()[basecolor];

        }

        var trace = {
            x: x_dat,
            xcalender: "%x",
            y: y_dat,
            //ycalendar: gregorian,
            type: "scatter",
            name: input_files[j].split("_")[1],
            connectgaps: true,
            line: {
                color: colors[j]
            }
        };

        graphish[j] = trace;

    }

    // // Set the string labels
    var xstring = "Date";
    var ystring = "Voltsss?";
    // need to add $$ for LaTeX to process
    var title_string = titleCase(category) + " vs. " + ystring; 

    // var diff = max_x - min_x;

    var layout = {
        font: {
            size: 20
        },
        title: title_string,
        yaxis: {
            title: ystring
        },
        xaxis: {
            title: xstring,
        },
        //hovermode: "closest"
    };

    return [graphish, layout];

}

// Cumulative and Monthly Profile
// Any-month

function cumulative_prof(all_results, input_files, category, basecolor) {
    // default: -,-,-,span

    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity;
    var margin = 0.25;
    
    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);
        var object2 = edit_met_data(object1);
        var cate_info = get_catinfo(object2);

        var colnames, vertlocs, ind;
        [colnames, vertlocs, ind] = get_vertical_locations(cate_info["columns"][category]) 

        var plotdat = [];
        for (var height = 0; height < colnames.length; height++) {

            var array_temp = [];
            array_temp = object2[colnames[height]];
            var total = 0;
            var test_mat = [];
            for (var i = 0; i < array_temp.length; i += 1) {
                // until there is a faster way to remove these
                if ((parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null)) {
                    test_mat.push(array_temp[i]);
                    total += parseFloat(array_temp[i]);
                }
            }
            plotdat.push(total / (test_mat.length));  

        }
        var maxdat = plotdat.filter(Boolean);

        if (Math.max(...maxdat) > max_x) {
            max_x = Math.max(...maxdat);
        }

        if (Math.min(...maxdat) < min_x) {
            min_x = Math.min(...maxdat);
        }

        if (input_files.length > 1) {

            var colors = get_colors(input_files.length, {basecolor: basecolor});

        } else {

            var colors = get_nrelcolors()[basecolor];

        }

        var trace = {
            x: plotdat,
            y: vertlocs,
            type: "scatter",
            name: input_files[j].split("_")[1].split(".")[0],
            connectgaps: true,
            line: {
                color: colors[j]
            }
        };

        graphish[j] = trace;
    }

    // Set the string labels
    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Probe Height} [m] $$";
    // need to add $$ for LaTeX to process
    var title_string = "$$ \\text{" + titleCase(category) + " vs. } " + ystring.replace("$$","") + " $$"; 

    var diff = max_x - min_x;

    if (category === "direction") {

        var exclude_angles = [46,228];
        var colors = get_nrelcolors();

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            yaxis: {
                title: ystring
            },
            xaxis: {
                title: xstring,
                range: [0,360]
            },
            hovermode: "closest",
            shapes: [{
                type: "rect", 
                xref: "paper", yref: "paper", 
                x0: (exclude_angles[0]/360), y0: 0, 
                x1: (exclude_angles[1]/360), y1: 1, 
                fillcolor: colors["red"][0], 
                opacity: 0.2, 
                line: {
                    width: 0
                }
            }]
        };


    } else {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            yaxis: {
                title: ystring
            },
            xaxis: {
                title: xstring,
                range: [min_x-margin*diff, max_x+margin*diff]
            },
            hovermode: "closest"
        };

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Stability Profile
// 1-month

function stab_prof(all_results, input_files, category, vertloc, basecolor) {
    // default: -,-,-,80,red

    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity;
    var margin = 0.25;

    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);
        var object2 = edit_met_data(object1);

        [stab_conds, stab_cats, metdat] = flag_stability(object2);
        var cate_info = get_catinfo(metdat);

        var stab, stabloc, ind;
        [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
        var stabconds = get_stabconds();
        var colors = get_colors(stabconds.length, {basecolor: basecolor});

        // Extract vertical locations of data from variable names
        var a, vertlocs, iax;
        [a, vertlocs, iax] = get_vertical_locations(cate_info["columns"][category]);
        
        for (var cond = 0; cond < stabconds.length; cond++) {

            var plotdat = [];
            for (var ii = 0; ii < cate_info["columns"][category].length; ii++) {
                
                var array_temp = [];
                array_temp = metdat[cate_info["columns"][category][ii]];
                var total = 0;
                var empty = 0;
                var test_mat = [];
                
                for (var i = 0; i < array_temp.length; i += 1) {
                    // until there is a faster way to remove these                        
                    if ((metdat[stab][i] === stabconds[cond]) && (parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null)) {
                        empty += 1;
                        test_mat.push(array_temp[i]);
                        total += parseFloat(array_temp[i]);
                    }
                }
                plotdat.push(total / (test_mat.length));  

            }
            var maxdat = plotdat.filter(Boolean);

            if (Math.max(...maxdat) > max_x) {
                max_x = Math.max(...maxdat);
            }

            if (Math.min(...maxdat) < min_x) {
                min_x = Math.min(...maxdat);
            }

            var trace = {
                x: plotdat,
                y: vertlocs,
                mode: "lines+markers",
                marker: {
                    color: colors[cond]
                },
                type: "scatter",
                connectgaps: true,
                name: stabconds[cond],
            };
            graphish = graphish.concat(trace);

        }

    }

    // set the string labels
    xstring = "$$" + cate_info["labels"][category] + "$$";
    ystring = "$$ \\text{Probe Height} [m] $$";
    // need to add $$ for LaTeX to process
    title_string = "$$ \\text{" + titleCase(category) + " vs. } " + ystring.replace("$$","") + " $$"; 

    var diff = max_x - min_x;

    if (category === "direction") {

        var exclude_angles = [46,228];
        var colors = get_nrelcolors();

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            yaxis: {
                title: ystring
            },
            xaxis: {
                title: xstring, 
                range: [0, 360]
            },
            hovermode: "closest",
            shapes: [{
                type: "rect", 
                xref: "paper", yref: "paper", 
                x0: (exclude_angles[0]/360), y0: 0, 
                x1: (exclude_angles[1]/360), y1: 1, 
                fillcolor: colors["red"][0], 
                opacity: 0.2, 
                line: {
                    width: 0
                }
            }]
        };

    } else {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            yaxis: {
                title: ystring
            },
            xaxis: {
                title: xstring, 
                range: [min_x-margin*diff, max_x+margin*diff]
            },
            hovermode: "closest"
        };

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Monthly Stability Profile
// Any-month

function monthly_stab_prof(all_results, input_files, category, vertloc, basecolor, format, {rows, cols} = {}) {
    // default: -,-,-,80,red,-,-,-

    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity;
    var layout = {annotations: []};
    var margin = 0.25;

    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);
        var object2 = edit_met_data(object1);

        var stab_conds, stab_cats, metdat;
        [stab_conds, stab_cats, metdat] = flag_stability(object2);
        var cate_info = get_catinfo(metdat);

        var stab, stabloc, ind;
        [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
        var stabconds = get_stabconds();
        var colors = get_colors(stabconds.length, {basecolor: basecolor});

        // Extract vertical locations of data from variable names
        var a, vertlocs, iax;
        [a, vertlocs, iax] = get_vertical_locations(cate_info["columns"][category]);
        
        for (var cond = 0; cond < stabconds.length; cond++) {

            var plotdat = [];
            for (var ii = 0; ii < cate_info["columns"][category].length; ii++) {
                
                var array_temp = [];
                array_temp = metdat[cate_info["columns"][category][ii]];
                var total = 0;
                var empty = 0;
                var test_mat = [];
                
                for (var i = 0; i < array_temp.length; i += 1) {
                    // until there is a faster way to remove these                        
                    if ((metdat[stab][i] === stabconds[cond]) && (parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null)) {
                        empty += 1;
                        test_mat.push(array_temp[i]);
                        total += parseFloat(array_temp[i]);
                    }
                }
                plotdat.push(total / (test_mat.length));  

            }
            var maxdat = plotdat.filter(Boolean);

            if (Math.max(...maxdat) > max_x) {
                max_x = Math.max(...maxdat);
            }

            if (Math.min(...maxdat) < min_x) {
                min_x = Math.min(...maxdat);
            }

            if ((format === "dropdown") | (format === "slider")) {

                var trace = {
                    x: plotdat,
                    y: vertlocs,
                    mode: "lines+markers",
                    marker: {
                        color: colors[cond]
                    },
                    type: "scatter",
                    connectgaps: true,
                    name: stabconds[cond],
                    visible: j === 0
                };
                graphish = graphish.concat(trace);

            }

            if (format === "grid") {

                var trace = {
                    x: plotdat,
                    y: vertlocs,
                    xaxis: "x" + (j+2),
                    yaxis: "y" + (j+2),
                    mode: "lines+markers",
                    marker: {
                        color: colors[cond]
                    },
                    type: "scatter",
                    connectgaps: true,
                    name: stabconds[cond],
                    showlegend: j ===0
                };
                graphish = graphish.concat(trace);

            }
        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        }

    }

    if (category === "direction") {

        var shapes = [];
        var exclude_angles = [46,228];

        for (var j = 0; j < input_files.length; j++){

            shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                        x0: exclude_angles[0], y0: min_y-margin*diff, 
                        x1: exclude_angles[1], y1: max_y+margin*diff, 
                        fillcolor: colors["red"][0], 
                        opacity: 0.2, 
                        line: {width: 0}
                        });
        }

    }

    if ((format === "dropdown") | (format === "slider")) {

        var buttons = [];
        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            var false_array = [];
            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    for(var sc1 = 0; sc1 < stabconds.length; sc1++) {
                        false_array.push(true);
                    }    
                } else {
                    for(var sc2 = 0; sc2 < stabconds.length; sc2++) {
                        false_array.push(false);
                    }
                }  
            }

            buttons.push({method: 'restyle', 
                          args: ['visible', false_array], 
                          label: input_files[j].replace(/_|.csv/g," ")
                        });
            
        }
    }

    if (format === "slider") {

        var steps = buttons;

    }

    // set the string labels
    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Probe Height} [m] $$";
    // need to add $$ for LaTeX to process
    var title_string = "$$ \\text{" + titleCase(category) + " vs. } " + ystring.replace("$$","") + " $$"; 

    var diff = max_x - min_x;

    if (format === "slider") {

        if (category === "direction") {

            var layout = {
                font: {
                    size: 20
                },
                sliders: [{
                    pad: {t: 30},
                    len: ((input_files.length)/12),
                    steps: steps
                }],
                title: title_string,
                yaxis: {
                    title: ystring
                },
                xaxis: {
                    title: xstring, 
                    range: [0,360]
                },
                hovermode: "closest",
                shapes: shapes
            };

        } else {
        
            var layout = {
                font: {
                    size: 20
                },
                sliders: [{
                    pad: {t: 30},
                    len: ((input_files.length)/12),
                    steps: steps
                }],
                title: title_string,
                yaxis: {
                    title: ystring
                },
                xaxis: {
                    title: xstring, 
                    range: [min_x-margin*diff, max_x+margin*diff]
                },
                hovermode: "closest"
            };

        }

    }

    if (format === "grid") {

        if (category === "direction") {

            layout["font"] = {size: 20};
            layout["title"] = title_string;
            layout["hovermode"] = "closest";

            for(var i = 0; i < input_files.length; i++) {
                layout["xaxis"+(i+2)]["range"] = [min_x-margin*diff, max_x+margin*diff];
                layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                        x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                        showarrow: true, arrowhead: 0, ax: 0, ay: 0});
            }
            layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                    x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                    showarrow: false, font: {size: 20}});
            layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                    x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                    showarrow: false, font: {size: 20}}); 

            layout["xaxis"] = {title: xstring, range: [0,360]};
            layout["shapes"] = shapes;

        } else {

            layout["font"] = {size: 20};
            layout["title"] = title_string;
            layout["hovermode"] = "closest";

            for(var i = 0; i < input_files.length; i++) {
                layout["xaxis"+(i+2)]["range"] = [min_x-margin*diff, max_x+margin*diff];
                layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                        x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                        showarrow: true, arrowhead: 0, ax: 0, ay: 0});
            }
            layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                    x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                    showarrow: false, font: {size: 20}});
            layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                    x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                    showarrow: false, font: {size: 20}}); 

            layout["xaxis"] = {title: xstring, range: [min_x-margin*diff, max_x+margin*diff]};

        }

    }

    if (format === "dropdown") {

        if (category === "direction") {

            var layout = {
                font: {
                    size: 20
                },
                title: title_string,
                yaxis: {
                    title: ystring
                },
                xaxis: {
                    title: xstring, 
                    range: [0,360]
                },
                updatemenus: [{
                    y: 1, 
                    yanchor: "top", 
                    buttons: buttons
                }],
                hovermode: "closest",
                shapes: shapes
            }

        } else {

            var layout = {
                font: {
                    size: 20
                },
                title: title_string,
                yaxis: {
                    title: ystring
                },
                xaxis: {
                    title: xstring, 
                    range: [min_x-margin*diff, max_x+margin*diff]
                },
                updatemenus: [{
                    y: 1, 
                    yanchor: "top", 
                    buttons: buttons
                }],
                hovermode: "closest"
            }

        }

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Hourly Plot
// 1-month

function hourly(all_results, input_files, category, basecolor) {
    // default: -,-,-,80,span

    // Set up data
    var graphish = []; 
    var max_y = -Infinity;
    var min_y = Infinity;
    var layout = {annotations: []};
    var margin = 0.25;

    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);
        var object2 = edit_met_data(object1);

        var stab_conds, stab_cats, metdat;
        [stab_conds, stab_cats, metdat] = flag_stability(object2);

        var cate_info = get_catinfo(metdat);
        var heights = cate_info["columns"][category].reverse();
        var colors = get_colors(heights.length, {basecolor: basecolor, reverse: true});

        var colnames, vertlocs, ind;
        [colnames, vertlocs, ind] = get_vertical_locations(heights, {reverse: true});

        for (var ii = 0; ii < heights.length; ii++) {

            var plotdat = [];
            for (var hour = 0; hour < 24; hour++) {

                var array_temp = [];
                array_temp = metdat[heights[ii]];
                var total = 0;
                var test_mat = [];
                
                for (var i = 0; i < array_temp.length; i += 1) {
                    // until there is a faster way to remove these                        
                    if ((parseInt(metdat["Date"][i].split(" ")[1].split(":")[0]) === hour) && (parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null)) {
                        test_mat.push(array_temp[i]);
                        total += parseFloat(array_temp[i]);
                    }
                }
                plotdat.push(total / (test_mat.length));  

                var maxdat = plotdat.filter(Boolean);

                if (Math.max(...maxdat) > max_y) {
                    max_y = Math.max(...maxdat);
                }

                if (Math.min(...maxdat) < min_y) {
                    min_y = Math.min(...maxdat);
                }

            }

            var trace = {
                x: [...Array(24).keys()],
                y: plotdat,
                mode: "lines+markers",
                marker: {
                    color: colors[ii]
                },
                type: "scatter",
                connectgaps: true,
                name: vertlocs[ii] + "m",
            };
            graphish = graphish.concat(trace);

        }
    }
    // set the string labels
    xstring = "$$ \\text{Time} [hour] $$";
    ystring = "$$" + cate_info["labels"][category] + "$$";
    // need to add $$ for LaTeX to process
    title_string = "$$ " + " \\text{Time[hour] vs. "+ titleCase(category) + "} $$";
        
    var diff = max_y - min_y;

    var layout = {
        font: {
            size: 20
        },
        title: title_string,
        yaxis: {
            title: ystring,
            range: [min_y-margin*diff, max_y+margin*diff]
        },
        xaxis: {
            title: xstring, 
            range: [0, 24]
        }
    };

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Monthly Hourly Plot
// Any-month

function monthly_hourly(all_results, input_files, category, basecolor, format, rows, cols) {
    // default: -,-,-,80,span,-,-,-

    // Set up data
    var graphish = []; 
    var max_y = -Infinity;
    var min_y = Infinity;
    var layout = {annotations: []};
    var margin = 0.25;

    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);
        var object2 = edit_met_data(object1);

        var stab_conds, stab_cats, metdat;
        [stab_conds, stab_cats, metdat] = flag_stability(object2);

        var cate_info = get_catinfo(metdat);
        var heights = cate_info["columns"][category].reverse();
        var colors = get_colors(heights.length, {basecolor: basecolor, reverse: true});

        var colnames, vertlocs, ind;
        [colnames, vertlocs, ind] = get_vertical_locations(heights, {reverse: true});

        for (var ii = 0; ii < heights.length; ii++) {

            var plotdat = [];
            for (var hour = 0; hour < 24; hour++) {

                var array_temp = [];
                array_temp = metdat[heights[ii]];
                var total = 0;
                var test_mat = [];
                
                for (var i = 0; i < array_temp.length; i += 1) {
                    // until there is a faster way to remove these                        
                    if ((parseInt(metdat["Date"][i].split(" ")[1].split(":")[0]) === hour) && (parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null)) {
                        test_mat.push(array_temp[i]);
                        total += parseFloat(array_temp[i]);
                    }
                }
                plotdat.push(total / (test_mat.length));  

                var maxdat = plotdat.filter(Boolean);

                if (Math.max(...maxdat) > max_y) {
                    max_y = Math.max(...maxdat);
                }

                if (Math.min(...maxdat) < min_y) {
                    min_y = Math.min(...maxdat);
                }

            }

            if ((format === "dropdown") | (format === "slider")) {

                var trace = {
                    x: [...Array(24).keys()],
                    y: plotdat,
                    mode: "lines+markers",
                    marker: {
                        color: colors[ii]
                    },
                    type: "scatter",
                    connectgaps: true,
                    name: vertlocs[ii] + "m",
                    visible: j === 0
                };
                graphish = graphish.concat(trace);

            }

            if (format === "grid") {

                var trace = {
                    x: [...Array(24).keys()],
                    y: plotdat,
                    xaxis: "x" + (j+2),
                    yaxis: "y" + (j+2),
                    mode: "lines+markers",
                    marker: {
                        color: colors[ii]
                    },
                    type: "scatter",
                    connectgaps: true,
                    name: vertlocs[ii] + "m",
                    showlegend: j ===0
                };
                graphish = graphish.concat(trace);

            }
        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        }

    }

    if ((format === "dropdown") | (format === "slider")) {

        buttons = [];
        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            false_array = [];
            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    for(var sc1 = 0; sc1 < heights.length; sc1++) {
                        false_array.push(true);
                    }    
                } else {
                    for(var sc2 = 0; sc2 < heights.length; sc2++) {
                        false_array.push(false);
                    }
                }  
            }
            buttons.push({method: 'restyle', args: ['visible', false_array], label: input_files[j].replace(/_|.csv/g," ")});
        }
    }

    if (format === "slider") {

        steps = buttons;

    }

    // set the string labels
    xstring = "$$ Time [hour] $$";
    ystring = "$$" + cate_info["labels"][category] + "$$";
    // need to add $$ for LaTeX to process
    title_string = "$$ " + " \\text{Time[hour] vs. "+ titleCase(category) + "} $$";

    var diff = max_y - min_y;

    if (format === "slider") {
        
        var layout = {
            font: {
                size: 20
            },
            sliders: [{
                pad: {t: 30},
                len: ((input_files.length)/12),
                steps: steps
            }],
            title: title_string,
            yaxis: {
                title: ystring,
                range: [min_y-margin*diff, max_y+margin*diff]
            },
            xaxis: {
                title: xstring, 
                range: [0, 24]
            }
        };

    }

    if (format === "grid") {

        layout["font"] = {size: 20};
        layout["title"] = title_string;
        
        for(var i = 0; i < input_files.length; i++) {
            layout["xaxis"+(i+2)]["range"] = [0, 24];
            layout["yaxis"+(i+2)]["range"] = [min_y-margin*diff, max_y+margin*diff];
            layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                    x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                    showarrow: true, arrowhead: 0, ax: 0, ay: 0});
        }
        layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                showarrow: false, font: {size: 20}});
        layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                showarrow: false, font: {size: 20}}); 

    }

    if (format === "dropdown") {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            yaxis: {
                title: ystring,
                range: [min_y-margin*diff, max_y+margin*diff]
            },
            xaxis: {
                title: xstring, 
                range: [0, 24]
            },
            updatemenus: [{
                y: 1, 
                yanchor: "top", 
                buttons: buttons
            }]
        }

    }

    return [graphish, layout];

}
// ///////////////////////////////////////////////////////////////

// Rose Fig

function rose_fig(all_results, input_files, category, vertloc, basecolor, bins, bin_arrange, nsector) {
    
    // Set up data
    var graphish = []; 
    var margin = 0.25;

    var object1 = process_data(all_results, 0);
    var object2 = edit_met_data(object1);
    var cate_info = get_catinfo(object2);
    
    if (category === "stability flag") {

        console.log("help");
        [stab_conds, stab_cats, metdat] = flag_stability(object2);

    } else {

        var metdat = object2;

    }

    [dircol, a, b] = get_vertical_locations(cate_info["columns"]["direction"], {location: vertloc});
    [varcol, vertlocs, c] = get_vertical_locations(cate_info["columns"][category], {location:vertloc});

    var winddir_old = metdat[dircol].filter(Boolean);
    var winddir = [];
    for (var w = 0; w < winddir_old.length; w++) {

        if (winddir_old[w] != -999) {
            winddir.push(winddir_old[w]);
        }

    }

    var vari_old = metdat[varcol].filter(Boolean);
    var vari = [];
    for (var v = 0; v < vari_old.length; v++) {

        if (vari_old[v] != -999) {
            vari.push(vari_old[v]);
        }

    }

    var colors = get_colors(bins-1, {basecolor: basecolor});
    colors.push("#3A4246");

    var dir_card = [];
    for (var dir = 0; dir < winddir.length; dir++) {
        dir_card.push(getCardinal(parseFloat(winddir[dir]),nsector));
    }

    var dir_obj = {};
    for (var dir = 0; dir < dir_card.length; dir++) {
        if (dir_obj[dir_card[dir]] == null) {
            dir_obj[dir_card[dir]] = [];
        }
        dir_obj[dir_card[dir]].push(vari[dir]);
    }

    var bin_mags = [];
    var startValue = Math.min(...vari);
    var stopValue = Math.max(...vari);

    if (bin_arrange === "Linear") {

        var step = (stopValue - startValue) / (bins);

        for (var i = 0; i < bins; i++) {
            bin_mags.push(startValue + (step * i));
        }

    }

    if (bin_arrange === "Inverse-Log") {

        var range = stopValue - startValue;
        bin_mags.push(0);

        for (var i = 0; i < (bins-1); i++) {
            bin_mags.push(startValue + ( range / ( Math.pow( 2,(bins-i-1) ) ) ));
        }

    }

    bin_mags.push(Infinity);

    var count = {};
    for (var key = 0; key < Object.keys(dir_obj).length; key++) {
        for (var itter = 0; itter < (bin_mags.length-1); itter++) {
            
            var numb = 0;
            for (var indy = 0; indy < dir_obj[Object.keys(dir_obj)[key]].length; indy++) {

                if ((parseFloat(dir_obj[Object.keys(dir_obj)[key]][indy]) >= bin_mags[itter]) & (parseFloat(dir_obj[Object.keys(dir_obj)[key]][indy]) < bin_mags[itter+1])) {
                    numb += 1;
                }

            }

            if (count[Object.keys(dir_obj)[key]] == null) {
                count[Object.keys(dir_obj)[key]] = [];
            }

            if (count[Object.keys(dir_obj)[key]].length != 0) {
                add_to = count[Object.keys(dir_obj)[key]][count[Object.keys(dir_obj)[key]].length-1];
                count[Object.keys(dir_obj)[key]].push(add_to + (numb/vari.length));
            } else {
                count[Object.keys(dir_obj)[key]].push(numb/vari.length);
            }

        }

    }


    var t_mat = [];
    for (var cd = 0; cd < nsector; cd++) {
        t_mat.push(getCardinal(cd*(360/nsector)+1,nsector));
    }   

    for (var bi = 0; bi < bins; bi++) {
        var r_mat = [];
        for (var sect = 0; sect < nsector; sect++) {
            r_mat.push(count[t_mat[sect]][bi]);
        }

        var trace = {
            r: r_mat,
            t: t_mat,
            name: "[" + parseFloat(bin_mags[bi]).toFixed(2) + ":" + parseFloat(bin_mags[bi+1]).toFixed(2) + ")",
            marker: {
                color: colors[bi]
            },
            type: "area",
        };

        graphish = graphish.concat(trace);

    }

    var layout = {
        title: "$$" + cate_info["labels"][category] + "\\text{ Distribution for " + input_files[0].replace("_"," ").replace(".csv","") + " } $$",
        orientation: 270,
        annotations: [{text: "Wind Speed", xref: "paper", yref: "paper",
                    x: 0, y: 0, showarrow: false, font: {size: 20}}]
    }

    graphish = graphish.reverse();

    return [graphish, layout];

}


// ///////////////////////////////////////////////////////////////

// // Monthly Rose Fig

// // Set up data
// var vertloc = 87;
// var margin = 0.25;
// var category = "speed";
// var bins = 6;
// var nsector = 32;
// var graphish = []; 
// var basecolor = "span";
// var format = "grid";
// var bin_arrange = "linear";
// var layout = {annotations: []};

// for (var j = 0; j < input_files.length; j++) {
//     // Convert CSV to JSON ... need to create dynamic labels in
//     // place of 7 and 10
//     var arrays = all_results[j].data;
//     var keys = arrays[7];
//     var values = arrays.slice(10);

//     var object1 = new Object();
//     // remove -1 in code with QC data
//     for (k = 0; k < (keys.length-1); k++) {
//         var new_values = [];
//         for (v = 0; v < values.length; v++) {
//             new_values.push(values[v][k]);
//         }
//         if (Object.keys(object1).indexOf(keys[k]) == -1) {
//             object1[keys[k]] = new_values;
//         } else {
//             object1[keys[k]+"_adv"] = new_values;
//         }
//     }       

//     var object2 = edit_met_data(object1);
//     var cate_info = get_catinfo(object2);
//     var metdat = object2;

//     [dircol, a, b] = get_vertical_locations(cate_info["columns"]["direction"], {location: vertloc});
//     [varcol, vertlocs, c] = get_vertical_locations(cate_info["columns"][category], {location:vertloc});
    
//     winddir = metdat[dircol].filter(Boolean);
//     vari = metdat[varcol].filter(Boolean);
    
//     colors = get_colors(bins-1, {basecolor: basecolor});
//     colors.push("#3A4246");

//     dir_card = [];
//     for (var dir = 0; dir < winddir.length; dir++) {
//         dir_card.push(getCardinal(parseFloat(winddir[dir]),nsector));
//     }

//     dir_obj = {};
//     for (var dir = 0; dir < dir_card.length; dir++) {
//         if (dir_obj[dir_card[dir]] == null) {
//             dir_obj[dir_card[dir]] = [];
//         }
//         dir_obj[dir_card[dir]].push(vari[dir]);
//     }

//     var bin_mags = [];
//     var startValue = 0;
//     var stopValue = Math.max(...vari);

//     if (bin_arrange === "linear") {

//         var step = (stopValue - startValue) / (bins);

//         for (var i = 0; i < bins; i++) {
//             bin_mags.push(startValue + (step * i));
//         }
//     }

//     if (bin_arrange === "inverse-log") {

//         var range = stopValue - startValue;
//         bin_mags.push(0);

//         for (var i = 0; i < (bins-1); i++) {
//             bin_mags.push(startValue + ( range / ( Math.pow( 2,(bins-i-1) ) ) ));
//         }

//     }

//     bin_mags.push(Infinity);

//     count = {};
//     for (var key = 0; key < Object.keys(dir_obj).length; key++) {
//         for (var itter = 0; itter < (bin_mags.length-1); itter++) {
//             var numb = 0;
//             for (var indy = 0; indy < dir_obj[Object.keys(dir_obj)[key]].length; indy++) {

//                 if ((parseFloat(dir_obj[Object.keys(dir_obj)[key]][indy]) >= bin_mags[itter]) & (parseFloat(dir_obj[Object.keys(dir_obj)[key]][indy]) < bin_mags[itter+1])) {
//                     numb += 1;
//                 }
//             }
//             if (count[Object.keys(dir_obj)[key]] == null) {
//                 count[Object.keys(dir_obj)[key]] = [];
//             }
//             if (count[Object.keys(dir_obj)[key]].length != 0) {
//                 add_to = count[Object.keys(dir_obj)[key]][count[Object.keys(dir_obj)[key]].length-1];
//                 count[Object.keys(dir_obj)[key]].push(add_to + (numb/vari.length));
//             } else {
//                 count[Object.keys(dir_obj)[key]].push(numb/vari.length);
//             }
//         }
//     }

//     t_mat = [];
//     for (var cd = 0; cd < nsector; cd++) {
//         t_mat.push(getCardinal(cd*(360/nsector)+1,nsector));
//     }   

//     for (var bi = 0; bi < bins; bi++) {
//         r_mat = [];
//         for (var sect = 0; sect < nsector; sect++) {
//             r_mat.push(count[t_mat[sect]][bi]);
//         }

//         if ((format === "dropdown") | (format === "slider")) {
//             var trace = {
//                 r: r_mat,
//                 t: t_mat,
//                 name: "[" + parseFloat(bin_mags[bi]).toFixed(2) + ":" + parseFloat(bin_mags[bi+1]).toFixed(2) + ")",
//                 marker: {
//                     color: colors[bi]
//                 },
//                 type: "area",
//                 visible: j === 0
//             };

//             graphish = graphish.concat(trace);
//         }

//         if (format === "grid") {
//             var trace = {
//                 r: r_mat,
//                 t: t_mat,
//                 xaxis: "x"+(j+2),
//                 yaxis: "y"+(j+2),
//                 name: "[" + parseFloat(bin_mags[bi]).toFixed(2) + ":" + parseFloat(bin_mags[bi+1]).toFixed(2) + ")",
//                 marker: {
//                     color: colors[bi]
//                 },
//                 type: "area",
//             };

//             graphish = graphish.concat(trace);
//         }
//     }

// }

// if ((format === "dropdown") | (format === "slider")) {

//     buttons = [];
//     for (var j = 0; j < input_files.length; j++){
//         // This array decides when to display a certain trace
//         false_array = [];
//         for(var i = 0; i < input_files.length; i++) {
//             if (i == j) {
//                 for(var sc1 = 0; sc1 < bins.length; sc1++) {
//                     false_array.push(true);
//                 }    
//             } else {
//                 for(var sc2 = 0; sc2 < bins.length; sc2++) {
//                     false_array.push(false);
//                 }
//             }  
//         }
//         buttons.push({method: 'restyle', args: ['visible', false_array], label: input_files[j].replace(/_|.csv/g," ")});
//     }
// }

// if (format === "slider") {

//     steps = buttons;

// }

// var title_string = "Wind Speed Distribution for " + input_files[0].replace("_"," ").replace(".csv","") + "-" + input_files[input_files.length-1].replace("_"," ").replace(".csv","");

// if (format === "slider") {
//     var layout = {
//         sliders: [{
//             pad: {t: 30},
//             len: ((input_files.length)/12),
//             steps: steps
//         }],
//         title: title_string,
//         orientation: 270
//     };
// }

// if (format === "dropdown") {

//     var layout = {
//         title: title_string,
//         updatemenus: [{
//             y: 1, 
//             yanchor: "top", 
//             buttons: buttons
//         }],
//         orientation: 270
//     }

// }

// if (format === "grid") {

//     layout["title"] = title_string;
//     layout["orientation"] = 270;
    
//     for(var i = 0; i < input_files.length; i++) {
//         // layout["xaxis"+(i+2)]["range"] = [0, 24];
//         // layout["yaxis"+(i+2)]["range"] = [0, 1.1*max_y];
//         layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
//                                 x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
//                                 showarrow: true, arrowhead: 0, ax: 0, ay: 0});
//     }
//     layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
//                             x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
//                             showarrow: false, font: {size: 20}});
//     layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
//                             x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
//                             showarrow: false, font: {size: 20}}); 

// }

// // var layout = {
// //     title: "Wind Speed Distribution for " + input_files[0].replace("_"," ").replace(".csv","") + "-" + input_files[input_files.length-1].replace("_"," ").replace(".csv",""),
// //     orientation: 270
// // }
// graphish = graphish.reverse();
// //console.log(graphish.slice(0,4));

// Plotly.newPlot("chart", graphish, layout)

// ///////////////////////////////////////////////////////////////

// Winddir Scatter   

function winddir_scatter(all_results, input_files, category, vertloc, basecolor) {
    
    // Set up data
    var graphish = []; 
    var margin = 0.25;
    var exclude_angles = [46,228];

    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j)  
        var object2 = edit_met_data(object1);
        var cate_info = get_catinfo(object2);

        var dircol, varcol, vertlocs, a, b, c;
        [dircol, a, b] = get_vertical_locations(cate_info["columns"]["direction"], {location: vertloc});
        [varcol, vertlocs, c] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

        var other_colors = get_nrelcolors(input_files.length);

        var trace = {
            x: object2[dircol],
            y: object2[varcol],
            mode: "markers",
            marker: {
                color: other_colors[basecolor][j]
            },
            type: "scatter",
            name: input_files[j].split("_")[1].split(".")[0],
            //visible: j === 0
        };
        graphish[j] = trace;

    }

    var buttons = [];
    var shapes = [];
    var colors = get_nrelcolors();

    // Create shape to exclude angles, only takes in one set
    // of a range of excluded angles
    shapes.push({type: "rect", xref: "paper", yref: "paper", 
                x0: (exclude_angles[0]/360), y0: 0, 
                x1: (exclude_angles[1]/360), y1: 1, 
                fillcolor: colors["red"][0], 
                opacity: 0.2, 
                line: {width: 0}
                });

    var xstring = "$$ Wind Direction [^\\circ] $$";
    var ystring = "$$" + cate_info["labels"][category] + "$$";
    var title_string = "$$ \\text{Wind Direction vs. }" + ystring.replace("$$","") + " $$";

    var layout = {
        font: {
            size: 20
        },
        title: title_string,
        shapes: shapes,
        xaxis: {title: xstring},
        yaxis: {title: ystring},
        hovermode: "closest"
    };

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Monthly Winddir Scatter 

function monthly_winddir_scatter(all_results, input_files, category, vertloc, basecolor, format, rows, cols) {
    
    // Set up data
    var graphish = []; 
    var layout = {annotations: []};
    var exclude_angles = [46,228];
    var max_y = -Infinity;
    var min_y = Infinity;
    var margin = 0.25;

    for (var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j)   
        var object2 = edit_met_data(object1);
        var cate_info = get_catinfo(object2);

        var dircol, varcol, vertlocs, a, b, c;
        [dircol, a, b] = get_vertical_locations(cate_info["columns"]["direction"], {location: vertloc});
        [varcol, vertlocs, c] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

        var other_colors = get_colors(input_files.length, {basecolor: basecolor});

        if (Math.max(...object2[varcol].filter(Boolean)) > max_y) {
            max_y = Math.max(...object2[varcol].filter(Boolean));
        }

        if (Math.min(...object2[varcol].filter(Boolean)) < min_y) {
            min_y = Math.min(...object2[varcol].filter(Boolean));
        }

        if ((format === "dropdown") | (format === "slider")) {

            var trace = {
                x: object2[dircol],
                y: object2[varcol],
                mode: "markers",
                marker: {
                    color: other_colors[j]
                },
                type: "scatter",
                name: input_files[j].split("_")[1].split(".")[0],
                visible: j === 0
            };
            graphish = graphish.concat(trace);

        }

        if (format === "grid") {

            var trace = {
                x: object2[dircol],
                y: object2[varcol],
                xaxis: "x" + (j+2),
                yaxis: "y" + (j+2),
                mode: "markers",
                marker: {
                    color: other_colors[j]
                },
                type: "scatter",
                name: input_files[j].split("_")[1].split(".")[0],
                showlegend: j ===0
            };
            graphish = graphish.concat(trace);

        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        }

    }

    var buttons = [];
    var shapes = [];
    var colors = get_nrelcolors();

    var diff = max_y - min_y;

    if ((format === "dropdown") | (format === "slider")) {

        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            false_array = [];

            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    false_array.push(true);
                } else {
                    false_array.push(false);
                }  
            }

            buttons.push({method: 'restyle', args: ['visible', false_array], 
                        label: input_files[j].replace(/_|.csv/g," ")
                        });
            shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                        x0: exclude_angles[0], y0: min_y-margin*diff, 
                        x1: exclude_angles[1], y1: max_y+margin*diff, 
                        fillcolor: colors["red"][0], 
                        opacity: 0.2, 
                        line: {width: 0}
                        });
        }

    }

    if (format === "slider") {

        steps = buttons;

    }

    if (format === "grid") {

        for (var j = 0; j < input_files.length; j++){

            shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                        x0: exclude_angles[0], y0: min_y-margin*diff, 
                        x1: exclude_angles[1], y1: max_y+margin*diff, 
                        fillcolor: colors["red"][0], 
                        opacity: 0.2, 
                        line: {width: 0}
                        });
        }

    }

    var xstring = "$$ \\text{Wind Direction}[^\\circ] $$";
    var ystring = "$$" + cate_info["labels"][category] + "$$";
    var title_string = "$$ \\text{Wind Direction vs. }" + ystring.replace("$$","") + " $$";

    var diff = max_y - min_y;

    if (format === "slider") {
        
        var layout = {
            font: {
                size: 20
            },
            sliders: [{
                pad: {t: 30},
                len: ((input_files.length)/12),
                steps: steps
            }],
            shapes: shapes,
            hovermode: "closest",
            showlegend: false,
            title: title_string,
            yaxis: {
                title: ystring,
                range: [min_y-margin*diff, max_y+margin*diff]
            },
            xaxis: {
                title: xstring, 
                range: [0, 360]
            }
        };

    }

    if (format === "grid") {

        layout["font"] = {size: 20};
        layout["title"] = title_string;
        layout["shapes"] = shapes;
        layout["hovermode"] = "closest";
        layout["showlegend"] = false;
        
        for(var i = 0; i < input_files.length; i++) {
            layout["xaxis"+(i+2)]["range"] = [0, 360];
            layout["yaxis"+(i+2)]["range"] = [min_y-margin*diff, max_y+margin*diff];
            layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                    x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                    showarrow: true, arrowhead: 0, ax: 0, ay: 0});
        }
        layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                showarrow: false, font: {size: 20}});
        layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                showarrow: false, font: {size: 20}}); 

    }

    if (format === "dropdown") {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            hovermode: "closest",
            showlegend: false,
            yaxis: {
                title: ystring,
                range: [min_y-margin*diff, max_y+margin*diff]
            },
            xaxis: {
                title: xstring, 
                range: [0, 360]
            },
            updatemenus: [{
                y: 1, 
                yanchor: "top", 
                buttons: buttons
            }],
            shapes: shapes
        }

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Stability Winddir Scatter 

// *** Only used for one month data

function stab_winddir_scatter(all_results, input_files, category, vertloc, basecolor) {

    // Set up data
    var exclude_angles = [46,228];
    var graphish = []; 
    var max_y = -Infinity;
    var min_y = Infinity;
    var margin = 0.25;

    // User input
    var one_plot = true;

    var object1 = process_data(all_results, 0);  
    var object2 = edit_met_data(object1);

    var stab_conds, stab_cats, metdat;
    [stab_conds, stab_cats, metdat] = flag_stability(object2);
    cate_info = get_catinfo(metdat);

    var dircol, varcol, vertlocs, stab, stabloc, ind, a, b, c;
    [dircol, a, b] = get_vertical_locations(cate_info["columns"]["direction"], {location: vertloc});
    [varcol, vertlocs, c] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});
    [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});

    var stabconds = get_stabconds();
    var other_colors = get_colors(stabconds.length, {basecolor: basecolor});

    for (var cond = 0; cond < stabconds.length; cond++) {

        var plotdat_x = [];
        var plotdat_y = [];
        for (var ii = 0; ii < metdat[dircol].length; ii++) {
            
            // until there is a faster way to remove these                        
            if ((metdat[stab][ii] === stabconds[cond]) && (parseFloat(metdat[dircol][ii]) != -999.0) && (metdat[dircol][ii] != null) && (parseFloat(metdat[varcol][ii]) != -999.0) && (metdat[varcol][ii] != null)) {
                plotdat_x.push(metdat[dircol][ii]);
                plotdat_y.push(metdat[varcol][ii]);
            }

        }
        var maxdat = plotdat_y.filter(Boolean);

        if (Math.max(...maxdat) > max_y) {
            max_y = Math.max(...maxdat);
        }

        if (Math.min(...maxdat) < min_y) {
            min_y = Math.min(...maxdat);
        }

        if (one_plot) {

            var trace = {
                x: plotdat_x,
                y: plotdat_y,
                mode: "markers",
                marker: {
                    color: other_colors[cond],
                    size: 12,
                },
                type: "scatter",
                name: stabconds[cond],
            };

        } else {

            var trace = {
                x: plotdat_x,
                y: plotdat_y,
                mode: "markers",
                marker: {
                    color: other_colors[cond]
                },
                type: "scatter",
                name: stabconds[cond],
                visible: cond === 0
            };

        }
        graphish = graphish.concat(trace);

    }

    var xstring = "$$ \\text{Wind Direction} [^\\circ] $$";
    var ystring = "$$" + cate_info["labels"][category] + "$$";
    var title_string = "$$ \\text{Wind Direction vs. }" + ystring.replace("$$","") + " $$";

    var diff = max_y - min_y;

    var colors = get_nrelcolors();

    if (one_plot) {

        var layout = {
            font: {
                size: 20
            },
            shapes: [{type: "rect", xref: "xaxis", yref: "yaxis", 
                    x0: exclude_angles[0], y0: min_y-margin*diff, 
                    x1: exclude_angles[1], y1: max_y+margin*diff, 
                    fillcolor: colors["red"][0], 
                    opacity: 0.2, 
                    line: {width: 0}
            }],
            hovermode: "closest",
            showlegend: true,
            title: title_string,
            yaxis: {
                title: ystring,
                range: [min_y-margin*diff, max_y+margin*diff]
            },
            xaxis: {
                title: xstring, 
                range: [0, 360]
            }
        };

    } else {

        buttons = [];
        shapes = [];

        var steps = [];
        for (var j = 0; j < stabconds.length; j++){
            // This array decides when to display a certain trace
            var false_array = [];

            for(var i = 0; i < stabconds.length; i++) {
                if (i == j) {
                    false_array.push(true);
                } else {
                    false_array.push(false);
                }  
            }
            
            steps.push({method: 'restyle', args: ['visible', false_array], 
                        label: stabconds[j]
                        });
            shapes.push({type: "rect", xref: "paper", yref: "paper", 
                        x0: (exclude_angles[0]/360), y0: 0, 
                        x1: (exclude_angles[1]/360), y1: 1, 
                        fillcolor: colors["red"][0], 
                        opacity: 0.2/stabconds.length, 
                        line: {width: 0}
                        });
        }

        var layout = {
            font: {
                size: 20
            },
            sliders: [{
                pad: {t: 30},
                len: ((stabconds.length)/12),
                steps: steps
            }],
            shapes: shapes,
            hovermode: "closest",
            showlegend: false,
            title: title_string,
            yaxis: {
                title: ystring,
                range: [min_y-margin*diff, max_y+margin*diff]
            },
            xaxis: {
                title: xstring, 
                range: [0, 360]
            }
        };

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Groupby Winddir Scatter 

function groupby_winddir_scatter(all_results, input_files, category, abscissa, group_by, vertloc, basecolor, nbins) {

    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity
    var max_y = -Infinity;
    var min_y = Infinity;
    var margin = 0.25;

    var object1 = process_data(all_results, 0);    

    if ((category === "stability flag") | (abscissa === "stability flag") | (group_by === "stability flag")) {

        var object2 = edit_met_data(object1);
        [stab_conds, stab_cats, metdat] = flag_stability(object2);
        var cate_info = get_catinfo(metdat);

    } else {

        var object2 = edit_met_data(object1);
        var cate_info = get_catinfo(object2);   
        var metdat = object2;

    }

    var varcol, vertlocs, groupcol, abscol, a, b, c, d, e;
    [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});
    [groupcol, b, c] = get_vertical_locations(cate_info["columns"][group_by], {location: vertloc});
    [abscol, d, e] = get_vertical_locations(cate_info["columns"][abscissa], {location: vertloc});

    var colors = get_colors(nbins, {basecolor: basecolor});

    var data_temp = metdat[groupcol];
    var test_mat = [];
    for (var i = 0; i < data_temp.length; i += 1) {
        // until there is a faster way to remove these                        
        if ((parseFloat(data_temp[i]) != -999.0) && (data_temp[i] != null)) {
            test_mat.push(data_temp[i]);
        }
    }

    var test_val = test_mat.sort(function(a, b) {return a - b;});
    var temp = [], i;
    for (i = 0; i < test_val.length; i += test_val.length/nbins) {
        temp.push(test_val.slice(i, i + test_val.length/nbins));
    }

    var bounds = {};
    for (var leng = 0; leng < temp.length; leng++) {
        bounds[""+leng] = [];
        bounds[""+leng].push(temp[leng][0]);
        bounds[""+leng].push(temp[leng][temp[leng].length-1]);
    }

    for (var bd = 0; bd < Object.keys(bounds).length; bd++) {
        x_dat = [];
        y_dat = [];
        for (var datlen = 0; datlen < metdat[abscol].length; datlen++) {
            var x = parseFloat(metdat[abscol][datlen]);
            var y = parseFloat(metdat[varcol][datlen]);
            var f = parseFloat(metdat[groupcol][datlen]);
            
            if ((x != -999.0) && (isNaN(x) === false) && (y != -999.0) && (isNaN(y) === false) && (f >= parseFloat(bounds[""+bd][0])) && (f <= parseFloat(bounds[""+bd][1]))) {

                x_dat.push(x);
                y_dat.push(y);

            }
        }

        if (Math.max(...x_dat) > max_x) {
            max_x = Math.max(...x_dat)
        }

        if (Math.min(...x_dat) < min_x) {
            min_x = Math.min(...x_dat)
        }

        if (Math.max(...y_dat) > max_y) {
            max_y = Math.max(...y_dat)
        }

        if (Math.min(...y_dat) < min_y) {
            min_y = Math.min(...y_dat)
        }

        var trace = {
            x: x_dat,
            y: y_dat,
            mode: "markers",
            name: "[" + bounds[""+bd][0] + ":" + bounds[""+bd][1] + "]",
            marker: {
                color: colors[bd]
            }
        }

        graphish = graphish.concat(trace);
    }

    // Set title and labels
    var title_string = "$$ \\text{Vertical Location = }" + vertloc + "\\text{m, Grouped by: }" + cate_info["labels"][group_by] + "$$";
    //x_string = cate_info["labels"][abscissa];
    var x_string = "$$ " + cate_info["labels"][abscissa] + " $$";
    var y_string = "$$ " + cate_info["labels"][category] + " $$";

    var diffx = max_x - min_x;
    var diffy = max_y - min_y;

    if ((category === "direction") | (abscissa === "direction")) {

        // Create shape to exclude angles, only takes in one set
        // of a range of excluded angles
        var exclude_angles = [46,228];
        var shapes = [];
        var colors = get_nrelcolors();

        if (category === "direction") {

            shapes.push({type: "rect", xref: "paper", yref: "paper", 
                         x0: 0, y0: (exclude_angles[0]/360), 
                         x1: 1, y1: (exclude_angles[1]/360), 
                         fillcolor: colors["red"][0], 
                         opacity: 0.2, 
                         line: {width: 0}
            });

        }

        if (abscissa === "direction") {

            shapes.push({type: "rect", xref: "paper", yref: "paper", 
            x0: (exclude_angles[0]/360), y0: 0, 
            x1: (exclude_angles[1]/360), y1: 1, 
            fillcolor: colors["red"][0], 
            opacity: 0.2, 
            line: {width: 0}
            });

        }

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            shapes: shapes,
            xaxis: {
                title: x_string,
                range: [min_x-margin*diffx, max_x+margin*diffx]
            },
            yaxis: {
                title: y_string,
                range: [min_y-margin*diffy, max_y+margin*diffy]
            },
            hovermode: "closest"
        }

    } else {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            xaxis: {
                title: x_string,
                range: [min_x-margin*diffx, max_x+margin*diffx]
            },
            yaxis: {
                title: y_string,
                range: [min_y-margin*diffy, max_y+margin*diffy]
            },
            hovermode: "closest"
        }

    }

    return [graphish, layout];

}

// if (graphish.length < nbins) {
//     alert("It appears there is missing data, some traces are missing.");
// } 

// ///////////////////////////////////////////////////////////////

// Monthly Groupby Winddir Scatter 

function monthly_groupby_winddir_scatter (all_results, input_files, category, abscissa, group_by, vertloc, basecolor, nbins, format, rows, cols) {

    // Set up data
    var max_x = -Infinity;
    var min_x = Infinity
    var max_y = -Infinity;
    var min_y = Infinity;
    var margin = 0.25;
    var exclude_angles = [46,228];

    var graphish = []; 
    var layout = {annotations: []};
    var full_mat = []; 
    var met_obj = {};

    for (var j = 0; j < input_files.length; j++) {
        // Convert CSV to JSON ... need to create dynamic labels in
        // place of 7 and 10
        var arrays = all_results[j].data;
        var keys = arrays[7];
        var values = arrays.slice(10);

        var object1 = new Object();
        // remove -1 in code with QC data
        for (k = 0; k < (keys.length-1); k++) {
            var new_values = [];
            for (v = 0; v < values.length; v++) {
                new_values.push(values[v][k]);
            }
            if (Object.keys(object1).indexOf(keys[k]) == -1) {
                object1[keys[k]] = new_values;
            } else {
                object1[keys[k]+"_adv"] = new_values;
            }
        }       

        var object2 = edit_met_data(object1);
        var cate_info = get_catinfo(object2);
        var metdat = object2;

        var varcol, vertlocs, groupcol, abscol, a, b, c, d, e;
        [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});
        [groupcol, b, c] = get_vertical_locations(cate_info["columns"][group_by], {location: vertloc});
        [abscol, d, e] = get_vertical_locations(cate_info["columns"][abscissa], {location: vertloc});

        var colors = get_colors(nbins, {basecolor: basecolor});

        var data_temp = metdat[groupcol];
        for (var i = 0; i < data_temp.length; i += 1) {
            // until there is a faster way to remove these                        
            if ((parseFloat(data_temp[i]) != -999.0) && (data_temp[i] != null)) {
                full_mat.push(data_temp[i]);
            }
        }

        met_obj[""+j] = metdat;
    }

    var test_val = full_mat.sort(function(a, b) {return a - b;});
    var temp = [], i;
    for (i = 0; i < test_val.length; i += test_val.length/nbins) {
        temp.push(test_val.slice(i, i + test_val.length/nbins));
    }

    var bounds = {};
    for (var leng = 0; leng < temp.length; leng++) {
        bounds[""+leng] = [];
        bounds[""+leng].push(temp[leng][0]);
        bounds[""+leng].push(temp[leng][temp[leng].length-1]);
    }

    for (var j = 0; j < input_files.length; j++) {
        for (var bd = 0; bd < Object.keys(bounds).length; bd++) {
            x_dat = [];
            y_dat = [];
            var metdat = met_obj[""+j];
            for (var datlen = 0; datlen < metdat[abscol].length; datlen++) {
                var x = parseFloat(metdat[abscol][datlen]);
                var y = parseFloat(metdat[varcol][datlen]);
                var f = parseFloat(metdat[groupcol][datlen]);
                
                if ((x != -999.0) && (isNaN(x) === false) && (y != -999.0) && (isNaN(y) === false) && (f >= parseFloat(bounds[""+bd][0])) && (f <= parseFloat(bounds[""+bd][1]))) {

                    x_dat.push(x);
                    y_dat.push(y);

                }
            }

            if (Math.max(...x_dat) > max_x) {
                max_x = Math.max(...x_dat)
            }

            if (Math.min(...x_dat) < min_x) {
                min_x = Math.min(...x_dat)
            }

            if (Math.max(...y_dat) > max_y) {
                max_y = Math.max(...y_dat)
            }

            if (Math.min(...y_dat) < min_y) {
                min_y = Math.min(...y_dat)
            }

            if ((format === "dropdown") | (format === "slider")) {

                var trace = {
                    x: x_dat,
                    y: y_dat,
                    mode: "markers",
                    name: "[" + bounds[""+bd][0] + ":" + bounds[""+bd][1] + "]",
                    marker: {
                        color: colors[bd]
                    },
                    visible: j === 0
                };
                graphish = graphish.concat(trace);

            }

            if (format === "grid") {
                
                var trace = {
                    x: x_dat,
                    y: y_dat,
                    xaxis: "x"+(j+2),
                    yaxis: "y"+(j+2),
                    mode: "markers",
                    name: "[" + bounds[""+bd][0] + ":" + bounds[""+bd][1] + "]",
                    marker: {
                        color: colors[bd]
                    },
                    showlegend: j === 0
                };
                graphish = graphish.concat(trace);

            }
        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        } 

    }

    var buttons = [];
    var shapes = [];
    var diffy = max_y - min_y;
    var diffx = max_x - min_x;

    if ((format === "dropdown") | (format === "slider")) {

        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            false_array = [];

            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    for (var iah = 0; iah < nbins; iah++) {
                        false_array.push(true);
                    }
                } else {
                    for (var iah = 0; iah < nbins; iah++) {
                        false_array.push(false);
                    }
                }  
            }

            buttons.push({method: 'restyle', args: ['visible', false_array], 
                        label: input_files[j].replace(/_|.csv/g," ")
                        });

            if ((category === "direction") | (abscissa === "direction")) {

                // Create shape to exclude angles, only takes in one set
                // of a range of excluded angles
                var shapes = [];
                var colors = get_nrelcolors();

                if (abscissa === "direction") {

                    shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                                 x0: exclude_angles[0], y0: min_y-margin*diffy, 
                                 x1: exclude_angles[1], y1: max_y+margin*diffy, 
                                 fillcolor: colors["red"][0], 
                                 opacity: 0.2, 
                                 line: {width: 0}
                    });

                }

                if (category === "direction") {

                    shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                                 x0: min_x-margin*diffx, y0: exclude_angles[0], 
                                 x1: max_x+margin*diffx, y1: exclude_angles[1], 
                                 fillcolor: colors["red"][0], 
                                 opacity: 0.2, 
                                 line: {width: 0}
                    });

                }

            }

        }

    }

    if (format === "slider") {

        steps = buttons;

    }

    if ((category === "direction") | (abscissa === "direction")) {

        if (format === "grid") {

            // Create shape to exclude angles, only takes in one set
            // of a range of excluded angles
            var shapes = [];
            var colors = get_nrelcolors();

            for (var j = 0; j < input_files.length; j++){

                if (abscissa === "direction") {

                    shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                                x0: exclude_angles[0], y0: min_y-margin*diffy, 
                                x1: exclude_angles[1], y1: max_y+margin*diffy, 
                                fillcolor: colors["red"][0], 
                                opacity: 0.2, 
                                line: {width: 0}
                    });

                }

                if (category === "direction") {

                    shapes.push({type: "rect", xref: "x"+(j+2), yref: "y"+(j+2), 
                                x0: min_x-margin*diffx, y0: exclude_angles[0], 
                                x1: max_x+margin*diffx, y1: exclude_angles[1], 
                                fillcolor: colors["red"][0], 
                                opacity: 0.2, 
                                line: {width: 0}
                    });

                }

            }

        }

    }

    // Set title and labels
    var title_string = "$$ \\text{Vertical Location = }" + vertloc + "\\text{m, Grouped by: }" + cate_info["labels"][group_by] + "$$";
    var x_string = "$$ " + cate_info["labels"][abscissa] + " $$";
    var y_string = "$$ " + cate_info["labels"][category] + " $$";

    if (format === "slider") {

        if ((category === "direction") | (abscissa === "direction")) {

            var layout = {
                font: {
                    size: 20
                },
                sliders: [{
                    pad: {t: 30},
                    len: ((input_files.length)/12),
                    steps: steps
                }],
                title: title_string,
                shapes: shapes,
                yaxis: {
                    title: y_string,
                    range: [min_y-margin*diffy, max_y+margin*diffy]
                },
                xaxis: {
                    title: x_string,
                    range: [min_x-margin*diffx, max_x+margin*diffx]
                },
                hovermode: "closest"
            };

        } else {
        
            var layout = {
                font: {
                    size: 20
                },
                sliders: [{
                    pad: {t: 30},
                    len: ((input_files.length)/12),
                    steps: steps
                }],
                title: title_string,
                yaxis: {
                    title: y_string,
                    range: [min_y-margin*diffy, max_y+margin*diffy]
                },
                xaxis: {
                    title: x_string,
                    range: [min_x-margin*diffx, max_x+margin*diffx]
                },
                hovermode: "closest"
            };

        }

    }

    if (format === "grid") {

        if ((category === "direction") | (abscissa === "direction")) {

            layout["font"] = {size: 20};
            layout["title"] = title_string;
            layout["hovermode"] = "closest";
            layout["shapes"] = shapes;
            // possible fix if other than 12 month periods
            //index_mat = [8,9,10,11];
            
            for(var i = 0; i < input_files.length; i++) {

                layout["xaxis"+(i+2)]["range"] = [min_x-margin*diffx, max_x+margin*diffx];
                layout["yaxis"+(i+2)]["range"] = [min_y-margin*diffy, max_y+margin*diffy];

                // if (index_mat.indexOf(i) < 0) {
                //     layout["xaxis"+(i+2)]["anchor"] = "x"+(index_mat[i%3]);
                // }

                layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                        x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                        showarrow: true, arrowhead: 0, ax: 0, ay: 0});

            }

            layout.annotations.push({text: x_string, xref: "paper", yref: "paper",
                                    x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                    showarrow: false, font: {size: 20}});

            layout.annotations.push({text: y_string, xref: "paper", yref: "paper",
                                    x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                    showarrow: false, font: {size: 20}}); 


        } else {

            layout["font"] = {size: 20};
            layout["title"] = title_string;
            layout["hovermode"] = "closest";
            // possible fix if other than 12 month periods
            //index_mat = [8,9,10,11];
            
            for(var i = 0; i < input_files.length; i++) {

                layout["xaxis"+(i+2)]["range"] = [min_x-margin*diffx, max_x+margin*diffx];
                layout["yaxis"+(i+2)]["range"] = [min_y-margin*diffy, max_y+margin*diffy];

                // if (index_mat.indexOf(i) < 0) {
                //     layout["xaxis"+(i+2)]["anchor"] = "x"+(index_mat[i%3]);
                // }                

                layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                        x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                        showarrow: true, arrowhead: 0, ax: 0, ay: 0});

            }

            layout.annotations.push({text: x_string, xref: "paper", yref: "paper",
                                    x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                    showarrow: false, font: {size: 20}});

            layout.annotations.push({text: y_string, xref: "paper", yref: "paper",
                                    x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                    showarrow: false, font: {size: 20}}); 

        }

    }

    if (format === "dropdown") {

        if ((category === "direction") | (abscissa === "direction")) {

            var layout = {
                font: {
                    size: 20
                },
                title: title_string,
                yaxis: {
                    title: y_string,
                    range: [min_y-margin*diffy, max_y+margin*diffy]
                },
                xaxis: {
                    title: x_string, 
                    range: [min_x-margin*diffx, max_x+margin*diffx]
                },
                shapes: shapes,
                updatemenus: [{
                    y: 1, 
                    yanchor: "top", 
                    buttons: buttons
                }],
                hovermode: "closest"
            }

        } else {

            var layout = {
                font: {
                    size: 20
                },
                title: title_string,
                yaxis: {
                    title: y_string,
                    range: [min_y-margin*diffy, max_y+margin*diffy]
                },
                xaxis: {
                    title: x_string, 
                    range: [min_x-margin*diffx, max_x+margin*diffx]
                },
                updatemenus: [{
                    y: 1, 
                    yanchor: "top", 
                    buttons: buttons
                }],
                hovermode: "closest"
            }

        }

    }

    return [graphish, layout];

}

// if (graphish.length < nbins*input_files.length) {
//     alert("It appears there is missing data, some traces are missing.");
// } 

// ///////////////////////////////////////////////////////////////

// Histogram

function hist(all_results, input_files, category, vertloc, basecolor, nbins, curvefit) {
    
    // Set up data
    var graphish = []; 
    var layout = {annotations: []};
    var margin = 0.25;

    var object1 = process_data(all_results, 0);   
    var object2 = edit_met_data(object1);
    var cate_info = get_catinfo(object2);

    var varcol, vertlocs, a;
    [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

    var hist_data = object2[varcol];

    //var filt_dat = hist_data.filter(Boolean);
    var filt_dat = filter_data(hist_data);
    var min_hist = Math.min(...filt_dat);
    var max_hist = Math.max(...filt_dat);

    if (min_hist < 0) {

        var shift = Math.abs(min_hist);

        for (var t = 0; t < filt_dat.length; t++) {

            filt_dat[t] += shift;

        }

    }

    var sum = 0;
    for( var i = 0; i < filt_dat.length; i++ ){
        sum += parseFloat(filt_dat[i]);
    }
    var mean = sum/filt_dat.length;

    var colors = get_nrelcolors();

    if (curvefit != "None") {

        var k = 0;
        var l = 0;

        if (curvefit === "Exponential") {

            k = 1;

        }

        if (curvefit === "Rayleigh") {

            k = 2;

        }

        if (curvefit === "Lognormal") {

            k = 2.5;

        }

        if (curvefit === "Normal") {

            k = 3.6;

        }

        if (curvefit === "Weibull") {

            var variance = 0;
            var n = filt_dat.length;
            var v1 = 0;
            var v2 = 0;

            if (n != 1) {

                for (var i = 0; i < n; i++) {
                    v1 = v1 + (filt_dat[i] - mean) * (filt_dat[i] - mean);
                    v2 = v2 + (filt_dat[i] - mean);
                }

                v2 = v2 * v2 / n;
                variance = (v1 - v2) / (n-1);

                if (variance < 0) { 
                    variance = 0; 
                }
        
                var std_dev = Math.sqrt(variance);

            }

            k = Math.pow((0.9874/(std_dev/mean)),1.0983);

        }            

        var arg = 1/k;
        l = mean / ((Math.sqrt(2*Math.PI*arg))*(Math.pow((arg/Math.E),arg)));

        var xdat = [];
        var ydat = [];
        for (var iter = min_hist; iter < max_hist; iter += ((max_hist-min_hist)/1000)) {

            xdat.push(iter); //- shift);

            if (min_hist < 0) {

                var iter_n = iter + shift;

            } else {

                var iter_n = iter;

            }
            
            var wb = (k/l)*(Math.pow((iter_n/l),k-1))*Math.pow(Math.E,-Math.pow((iter_n/l),k));
            ydat.push(wb);

        }
        
        var sf = 0.5/Math.max(...ydat);

        for (var ss = 0; ss < ydat.length; ss++) {

            ydat[ss] = ydat[ss]*sf;

        }

        var trace_cv = {
            x: xdat,
            y: ydat,
            mode: "lines",
            line: {
                color: "rgb(0, 0, 0)"
            },
            name: curvefit,
        };

        graphish = graphish.concat(trace_cv);

        layout["annotations"].push({text: "Shape Parameter: " + k.toFixed(2), xref: "paper", yref: "paper",
                                    x: 0.9, y: 0.9, showarrow: false, font: {size: 16}}); 

        layout["annotations"].push({text: "Scale Parameter: " + l.toFixed(2), xref: "paper", yref: "paper",
                                    x: 0.9, y: 0.8, showarrow: false, font: {size: 16}});                                     

    }

    var trace = {
        x: hist_data,
        type: "histogram",
        xbins: {
            start: min_hist,
            end: max_hist,
            size: (max_hist - min_hist)/(nbins)
        },
        histnorm: "probability",
        marker: {
            color: colors[basecolor][0],
            line: {
                width: 2
            }
        },
        name: input_files[0].split("_")[1].split(".")[0],
    };

    graphish = graphish.concat(trace);

    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Frequency} [\\%] $$";
    var title_string = "$$ \\text{Frequency Histogram of }" + xstring.replace("$$"," ");

    layout["font"] = {size: 20};
    layout["title"] =  title_string;
    layout["xaxis"] = {title: xstring};
    layout["yaxis"] = {title: ystring};
    layout["hovermode"] = "closest";

    console.log(graphish);

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Monthly Histogram

function monthly_hist(all_results, input_files, category, vertloc, basecolor, nbins, format, rows, cols) {

    // Set up data
    var graphish = []; 
    var layout = {annotations: []};
    var max_y = 0.3;
    var margin = 0.25;

    var max_x_t = -Infinity;
    var min_x_t = Infinity;

    for (var j = 0; j < input_files.length; j++) {

        var max_x = -Infinity;
        var min_x = Infinity;

        var object1 = process_data(all_results, j);    
        var object2 = edit_met_data(object1);
        var cate_info = get_catinfo(object2);

        var varcol, vertlocs, a;
        [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

        var hist_data = object2[varcol];
        
        var colors = get_colors(input_files.length, {basecolor: basecolor});
        
        if (Math.max(...hist_data) > max_x) {
            max_x = Math.max(...hist_data);
        }

        if (Math.min(...hist_data) < min_x) {
            min_x = Math.min(...hist_data);
        }

        if (Math.max(...hist_data) > max_x_t) {
            max_x_t = Math.max(...hist_data);
        }

        if (Math.min(...hist_data) < min_x_t) {
            min_x_t = Math.min(...hist_data);
        }

        if ((format === "dropdown") | (format === "slider")) {

            var trace = {
                x: hist_data,
                type: "histogram",
                xbins: {
                    start: Math.min(...hist_data),
                    end: Math.max(...hist_data),
                    size: (Math.max(...hist_data) - Math.min(...hist_data))/(nbins)
                },
                histnorm: "probability",
                marker: {
                    color: colors[j],
                    line: {
                        width: 2
                    }
                },
                name: input_files[j].split("_")[1].split(".")[0],
                visible: j === 0
            };
            graphish = graphish.concat(trace);

        }

        if (format === "grid") {
            
            console.log(nbins);
            var trace = {
                x: hist_data,
                xaxis: "x" + (j+2),
                yaxis: "y" + (j+2),
                type: "histogram",
                xbins: {
                    start: Math.min(...hist_data),
                    end: Math.max(...hist_data),
                    size: (Math.max(...hist_data) - Math.min(...hist_data))/(nbins)
                },
                histnorm: "probability",
                marker: {
                    color: colors[j],
                    line: {
                        width: 2
                    }
                },
                name: input_files[j].split("_")[1].split(".")[0],
            };
            graphish = graphish.concat(trace);

        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        }    

    }

    var buttons = [];
    var shapes = [];

    if ((format === "dropdown") | (format === "slider")) {

        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            false_array = [];

            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    false_array.push(true);
                } else {
                    false_array.push(false);
                }  
            }
            buttons.push({method: 'restyle', args: ['visible', false_array], 
                        label: input_files[j].replace(/_|.csv/g," ")
                        });
        }

    }

    if (format === "slider") {

        steps = buttons;

    }

    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Frequency} [\\%] $$";
    var title_string = "$$ \\text{Frequency Histogram of }" + xstring.replace("$$"," ");

    var diff = max_x - min_x;

    if (format === "slider") {
        
        var layout = {
            font: {
                size: 20
            },
            sliders: [{
                pad: {t: 30},
                len: ((input_files.length)/12),
                steps: steps
            }],
            showlegend: false,
            title: title_string,
            yaxis: {
                title: ystring,
                range: [0, max_y]
            },
            xaxis: {
                title: xstring,
                range: [min_x_t-margin*diff, max_x_t+margin*diff]
            }
        };

    }

    if (format === "grid") {

        layout["font"] = {size: 20};
        layout["title"] = title_string;
        layout["showlegend"] = false;
        
        for(var i = 0; i < input_files.length; i++) {
            layout["xaxis"+(i+2)]["range"] = [min_x_t-margin*diff, max_x_t+margin*diff];
            layout["yaxis"+(i+2)]["range"] = [0, max_y];
            layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                    x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                    showarrow: true, arrowhead: 0, ax: 0, ay: 0});
        }
        layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                showarrow: false, font: {size: 20}});
        layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                showarrow: false, font: {size: 20}}); 

    }

    if (format === "dropdown") {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            showlegend: false,
            yaxis: {
                title: ystring,
                range: [0, max_y]
            },
            xaxis: {
                title: xstring, 
                range: [min_x_t-margin*diff, max_x_t+margin*diff]
            },
            updatemenus: [{
                y: 1, 
                yanchor: "top", 
                buttons: buttons
            }]
        }

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Histogram by Stability

function hist_by_stab(all_results, input_files, category, vertloc, basecolor, nbins) {
    
    // Set up data
    var graphish = []; 
    var max_x = -Infinity;
    var min_x = Infinity;   
    var margin = 0.25; 

    var object1 = process_data(all_results, 0); 
    var object2 = edit_met_data(object1);

    var stab_conds, stab_cats, metdat;
    [stab_conds, stab_cats, metdat] = flag_stability(object2);

    var cate_info = get_catinfo(metdat);

    var varcol, vertlocs, a;
    [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

    var stab, stabloc, ind;
    [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
    var stabconds = get_stabconds();

    var colors = get_colors(stabconds.length, {basecolor: basecolor});


    for (var cond = 0; cond < stabconds.length; cond++) {

        var hist_data = [];
        for (var ii = 0; ii < metdat[varcol].length; ii++) {
            
            // until there is a faster way to remove these                        
            if ((metdat[stab][ii] === stabconds[cond]) && (parseFloat(metdat[varcol][ii]) != -999.0) && (metdat[varcol][ii] != null)) {
                hist_data.push(metdat[varcol][ii]);
            }

        }
        var maxdat = hist_data.filter(Boolean);

        if (Math.max(...maxdat) > max_x) {
            max_x = Math.max(...maxdat);
        }    

        if (Math.min(...maxdat) < min_x) {
            min_x = Math.min(...maxdat);
        }  

        var min_hist = Math.min(...hist_data);
        var max_hist = Math.max(...hist_data);        

        var trace = {
            x: hist_data,
            type: "histogram",
            xbins: {
                start: min_hist,
                end: max_hist,
                size: (max_hist - min_hist)/(nbins)
            },
            histnorm: "probability",
            showlegend: cond === 0,
            visible: cond === 0,
            marker: {
                color: colors[cond],
                line: {
                    width: 2
                }
            },
            name: stabconds[cond]
        };

        graphish = graphish.concat(trace);
    }

    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Frequency} [\\%] $$";
    var title_string = "$$ \\text{Frequency Histogram of }" + xstring.replace("$$"," ");

    var diff = max_x - min_x;

    var steps = [];
    for (var j = 0; j < stabconds.length; j++){
        // This array decides when to display a certain trace
        var false_array = [];

        for(var i = 0; i < stabconds.length; i++) {
            if (i == j) {
                false_array.push(true);
            } else {
                false_array.push(false);
            }  
        }
        
        steps.push({method: 'restyle', args: ['visible', false_array], 
                    label: stabconds[j]
                    });

    }

    var layout = {
        font: {
            size: 20
        },
        sliders: [{
            pad: {t: 30},
            len: ((stabconds.length)/12),
            steps: steps
        }],
        title: title_string,
        yaxis: {
            title: ystring,
            range: [0, 0.4]
        },
        xaxis: {
            title: xstring, 
            range: [min_x-margin*diff, max_x+margin*diff]
        }
    };

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Stacked Histogram by Stability

function stacked_hist_by_stab(all_results, input_files, category, vertloc, basecolor) {

    // Set up data
    var graphish = []; 
    var layout = {};
    var margin = 0.25;

    var object1 = process_data(all_results, 0); 
    var object2 = edit_met_data(object1);

    var stab_conds, stab_cats, metdat;
    [stab_conds, stab_cats, metdat] = flag_stability(object2);

    var cate_info = get_catinfo(metdat);

    var varcol, vertlocs, a;
    [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

    var stab, stabloc, ind;
    [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
    var stabconds = get_stabconds();

    var colors = get_colors(stabconds.length, {basecolor: basecolor});
    var max_mat = [];

    for (var cond = 0; cond < stabconds.length; cond++) {

        var hist_data = [];
        for (var ii = 0; ii < metdat[varcol].length; ii++) {
            
            // until there is a faster way to remove these                        
            if ((metdat[stab][ii] === stabconds[cond]) && (parseFloat(metdat[varcol][ii]) != -999.0) && (metdat[varcol][ii] != null)) {
                hist_data.push(metdat[varcol][ii]);
            }

        }     

        var trace = {
            x: hist_data,
            type: "histogram",
            histnorm: "probability",
            marker: {
                color: colors[cond],
                line: {
                    width: 2
                }
            },
            name: stabconds[cond]
        };

        graphish = graphish.concat(trace);
    }

    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Frequency} [\\%] $$";
    var title_string = "$$ \\text{Frequency Histogram of }" + xstring.replace("$$"," ");

    layout["font"] = {size: 20};
    layout["title"] =  title_string;
    layout["xaxis"] = {title: xstring};
    layout["yaxis"] = {title: ystring};
    //layout["hovermode"] = "closest";
    layout["barmode"] = "stack";

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Monthly Stacked Histogram by Stability

function monthly_stacked_hist_by_stab(all_results, input_files, category, vertloc, basecolor, format, rows, cols) {

    // Set up data
    var graphish = []; 
    var layout = {annotations: []};
    var max_x = -Infinity;
    var min_x = Infinity;
    var max_y = 2;
    var margin = 0.25;

    for(var j = 0; j < input_files.length; j++) {

        var object1 = process_data(all_results, j);    
        var object2 = edit_met_data(object1);

        var stab_conds, stab_cats, metdat;
        [stab_conds, stab_cats, metdat] = flag_stability(object2);

        var cate_info = get_catinfo(metdat);

        var varcol, vertlocs, a;
        [varcol, vertlocs, a] = get_vertical_locations(cate_info["columns"][category], {location: vertloc});

        var stab, stabloc, ind;
        [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
        var stabconds = get_stabconds();

        var colors = get_colors(stabconds.length, {basecolor: basecolor});

        for (var cond = 0; cond < stabconds.length; cond++) {

            var hist_data = [];
            for (var ii = 0; ii < metdat[varcol].length; ii++) {
                
                // until there is a faster way to remove these                        
                if ((metdat[stab][ii] === stabconds[cond]) && (parseFloat(metdat[varcol][ii]) != -999.0) && (metdat[varcol][ii] != null)) {
                    hist_data.push(metdat[varcol][ii]);
                }

            }
            var maxdat = hist_data.filter(Boolean);

            if (Math.max(...maxdat) > max_x) {
                max_x = Math.max(...maxdat);
            }    

            if (Math.min(...maxdat) < min_x) {
                min_x = Math.min(...maxdat);
            }    

            // var min_hist = Math.min(...hist_data);
            // var max_hist = Math.max(...hist_data);        
        
            if ((format === "dropdown") | (format === "slider")) {
                var trace = {
                    x: hist_data,
                    type: "histogram",
                    // xbins: {
                    //     start: min_hist,
                    //     end: max_hist,
                    //     size: (max_hist - min_hist)/(nbins)
                    // },
                    histnorm: "probability",
                    visible: j === 0,
                    showlegend: j === 0,
                    marker: {
                        color: colors[cond],
                        line: {
                            width: 2
                        }
                    },
                    name: stabconds[cond],
                };

                graphish = graphish.concat(trace);
            }

            if (format === "grid") {
                var trace = {
                    x: hist_data,
                    xaxis: "x" + (j+2),
                    yaxis: "y" + (j+2),
                    type: "histogram",
                    showlegend: j === 0,
                    // xbins: {
                    //     start: min_hist,
                    //     end: max_hist,
                    //     size: (max_hist - min_hist)/(nbins)
                    // },
                    histnorm: "probability",
                    marker: {
                        color: colors[cond],
                        line: {
                            width: 2
                        }
                    },
                    name: stabconds[cond],
                };

                graphish = graphish.concat(trace);
            }
        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        }

    }

    buttons = [];
    shapes = [];

    if ((format === "dropdown") | (format === "slider")) {

        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            false_array = [];

            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    for (var iah = 0; iah < stabconds.length; iah++) {
                        false_array.push(true);
                    }
                } else {
                    for (var iah = 0; iah < stabconds.length; iah++) {
                        false_array.push(false);
                    }
                }  
            }
            buttons.push({method: 'restyle', args: ['visible', false_array], 
                        label: input_files[j].replace(/_|.csv/g," ")
                        });
        }

    }

    if (format === "slider") {

        steps = buttons;

    }

    var xstring = "$$" + cate_info["labels"][category] + "$$";
    var ystring = "$$ \\text{Frequency} [\\%] $$";
    var title_string = "$$ \\text{Frequency Histogram of }" + xstring.replace("$$"," ");

    var diff = max_x - min_x;

    if (format === "slider") {
        
        var layout = {
            font: {
                size: 20
            },
            sliders: [{
                pad: {t: 30},
                len: ((input_files.length)/12),
                steps: steps
            }],
            //showlegend: false,
            barmode: "stack",
            title: title_string,
            yaxis: {
                title: ystring,
                range: [0, max_y]
            },
            xaxis: {
                title: xstring,
                range: [min_x-margin*diff, max_x+margin*diff]
            }
        };

    }

    if (format === "grid") {

        layout["font"] = {size: 20};
        layout["title"] = title_string;
        //layout["showlegend"] = false;
        layout["barmode"] = "stack";
        
        for(var i = 0; i < input_files.length; i++) {
            layout["xaxis"+(i+2)]["range"] = [min_x-margin*diff, max_x+margin*diff];
            layout["yaxis"+(i+2)]["range"] = [0, max_y];
            layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                    x: layout["xaxis"+(i+2)].domain[1]-0.02, y: layout["yaxis"+(i+2)].domain[1]-0.05,
                                    showarrow: true, arrowhead: 0, ax: 0, ay: 0});
        }
        layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                showarrow: false, font: {size: 20}});
        layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                showarrow: false, font: {size: 20}}); 

    }

    if (format === "dropdown") {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            //showlegend: false,
            barmode: "stack",
            yaxis: {
                title: ystring,
                range: [0, max_y]
            },
            xaxis: {
                title: xstring, 
                range: [min_x-margin*diff, max_x+margin*diff]
            },
            updatemenus: [{
                y: 1, 
                yanchor: "top", 
                buttons: buttons
            }]
        }

    }

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Normalized Histogram by Stability

function norm_hist_by_stab(all_results, input_files, vertloc, basecolor) {

    // Set up data
    var graphish = []; 
    var margin = 0.25;

    var object1 = process_data(all_results, 0);   
    var object2 = edit_met_data(object1);

    var stab_conds, stab_cats, metdat;
    [stab_conds, stab_cats, metdat] = flag_stability(object2);

    var cate_info = get_catinfo(metdat);

    var stab, stabloc, ind;
    [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
    var stabconds = get_stabconds();

    var colors = get_colors(stabconds.length, {basecolor: basecolor});

    var all_dat = [[],[],[],[],[]];
    for (var cond = 0; cond < stabconds.length; cond++) {

        var plotdat = [];
        for (var hour = 0; hour < 24; hour++) {

            var array_temp = [];
            var array_temp = metdat[stab];
            var cond_array = [];
            
            for (var i = 0; i < array_temp.length; i += 1) {
                // until there is a faster way to remove these                      
                if ((parseInt(metdat["Date"][i].split(" ")[1].split(":")[0]) === hour) && (parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null) && (array_temp[i] === stabconds[cond])) {
                    cond_array.push(array_temp[i]);
                }
            }

            plotdat.push(cond_array.length/array_temp.length);
        }

        all_dat[cond].push(plotdat);

        var x_dat = range(18,42,1);

        for (var d = 0; d < x_dat.length; d++) {

            x_dat[d] = x_dat[d]%24;

        }

        var trace = {
            x: x_dat,
            y: plotdat,
            type: "bar",
            marker: {
                color: colors[cond],
            },
            name: stabconds[cond]
        };

        graphish = graphish.concat(trace);

    }

    for (var hour = 0; hour < graphish[0]["y"].length; hour++) {

        var total = 0;
        for (var cond = 0; cond < graphish.length; cond++) {
            total += graphish[cond]["y"][hour];
        }
        for (var cond = 0; cond < graphish.length; cond++) {
            graphish[cond]["y"][hour] = graphish[cond]["y"][hour]*100/total;
        }

    }

    var xstring = "$$ \\text{Time of Day [Hour]} $$";
    var ystring = "$$ \\text{Probability of Stability} [\\%] $$";
    var title_string = "$$ \\text{Time of Day vs. Probability of Stability} $$";

    var layout = {
        font: {
            size: 20
        },
        "title": title_string,
        "xaxis": {
            title: xstring
        },
        "yaxis": {
            title: ystring
        },
        "barmode": "stack"
    };

    return [graphish, layout];

}

// ///////////////////////////////////////////////////////////////

// Normalized Monthly Histogram by Stability

function monthly_norm_hist_by_stab(all_results, input_files, vertloc, basecolor, format, rows, cols) {

    // Set up data
    var graphish_fin = []; 
    var layout = {annotations: []};
    var margin = 0.25;

    for (var j = 0; j < input_files.length; j++) {
        var graphish = [];

        var object1 = process_data(all_results, j);   
        var object2 = edit_met_data(object1);
    
        var stab_conds, stab_cats, metdat;
        [stab_conds, stab_cats, metdat] = flag_stability(object2);
        var cate_info = get_catinfo(metdat);
    
        var stab, stabloc, ind;
        [stab, stabloc, ind] = get_vertical_locations(cate_info["columns"]["stability flag"], {location: vertloc});
        var stabconds = get_stabconds();

        var colors = get_colors(stabconds.length, {basecolor: basecolor});
    
        var all_dat = [[],[],[],[],[]];
        for (var cond = 0; cond < stabconds.length; cond++) {
    
            var plotdat = [];
            for (var hour = 0; hour < 24; hour++) {
    
                var array_temp = [];
                var array_temp = metdat[stab];
                var cond_array = [];
                
                for (var i = 0; i < array_temp.length; i += 1) {
                    // until there is a faster way to remove these                      
                    if ((parseInt(metdat["Date"][i].split(" ")[1].split(":")[0]) === hour) && (parseFloat(array_temp[i]) != -999.0) && (array_temp[i] != null) && (array_temp[i] === stabconds[cond])) {
                        cond_array.push(array_temp[i]);
                    }
                }

                plotdat.push(cond_array.length/array_temp.length);
            }

            all_dat[cond].push(plotdat);

            var x_dat = range(18,42,1);

            for (var d = 0; d < x_dat.length; d++) {
    
                x_dat[d] = x_dat[d]%24;
    
            }

            if ((format === "dropdown") | (format === "slider")) {

                var trace = {
                    x: x_dat,
                    y: plotdat,
                    type: "bar",
                    visible: j === 0,
                    marker: {
                        color: colors[cond],
                    },
                    name: stabconds[cond]
                };

                graphish = graphish.concat(trace);

            }

            if (format === "grid") {

                var trace = {
                    x: x_dat,
                    y: plotdat,
                    xaxis: "x" + (j+2),
                    yaxis: "y" + (j+2),
                    type: "bar",
                    showlegend: j === 0,
                    marker: {
                        color: colors[cond],
                    },
                    name: stabconds[cond]
                };

                graphish = graphish.concat(trace);

            }
        }

        if (format === "grid") {

            layout["yaxis" + (j+2)] = {
                domain: calcDomain_y(Math.floor(j/cols),rows)
            };

            layout["xaxis" + (j+2)] = {
                domain: calcDomain_x(j%cols,cols)
            };

        }

        for (var hour = 0; hour < graphish[0]["y"].length; hour++) {

            var total = 0;
            for (var cond = 0; cond < graphish.length; cond++) {
                total += graphish[cond]["y"][hour];
            }
            for (var cond = 0; cond < graphish.length; cond++) {
                graphish[cond]["y"][hour] = graphish[cond]["y"][hour]*100/total;
            }
        }

        graphish_fin = graphish_fin.concat(graphish);

    }

    var buttons = [];
    var shapes = [];

    if ((format === "dropdown") | (format === "slider")) {

        for (var j = 0; j < input_files.length; j++){
            // This array decides when to display a certain trace
            false_array = [];

            for(var i = 0; i < input_files.length; i++) {
                if (i == j) {
                    for (var iah = 0; iah < stabconds.length; iah++) {
                        false_array.push(true);
                    }
                } else {
                    for (var iah = 0; iah < stabconds.length; iah++) {
                        false_array.push(false);
                    }
                }  
            }
            buttons.push({method: 'restyle', args: ['visible', false_array], 
                        label: input_files[j].replace(/_|.csv/g," ")
                        });
        }

    }

    if (format === "slider") {

        steps = buttons;

    }

    var xstring = "$$ \\text{Time of Day [Hour]} $$";
    var ystring = "$$ \\text{Probability of Stability} [\\%] $$";
    var title_string = "$$ \\text{Time of Day [Hour] vs. Probability of Stability} [\\%] $$";

    if (format === "slider") {
        
        var layout = {
            font: {
                size: 20
            },
            sliders: [{
                pad: {t: 30},
                len: ((input_files.length)/12),
                steps: steps
            }],
            barmode: "stack",
            title: title_string,
            yaxis: {
                title: ystring,
                range: [0, 100]
            },
            xaxis: {
                title: xstring,
                range: [-0.5, 23.5]
            }
        };

    }

    if (format === "grid") {

        layout["font"] = {size: 20};
        layout["title"] = title_string;
        //layout["showlegend"] = false;
        layout["barmode"] = "stack";
        
        for(var i = 0; i < input_files.length; i++) {
            layout["xaxis"+(i+2)]["range"] = [-0.5, 23.5];
            layout["yaxis"+(i+2)]["range"] = [0, 100];
            layout.annotations.push({text: input_files[i].split("_")[1].split(".")[0], xref: "paper", yref: "paper", 
                                    x: layout["xaxis"+(i+2)].domain[1]+0.005, y: layout["yaxis"+(i+2)].domain[1]-0.14, textangle: 90,
                                    showarrow: true, arrowhead: 0, ax: 0, ay: 0});
        }
        layout.annotations.push({text: xstring, xref: "paper", yref: "paper",
                                x: 0.5, y: 1, xanchor: "center", yanchor: "bottom",
                                showarrow: false, font: {size: 20}});
        layout.annotations.push({text: ystring, xref: "paper", yref: "paper",
                                x: 1, y: 0.5, xanchor: "left", yanchor: "middle", textangle: 90,
                                showarrow: false, font: {size: 20}}); 

    }

    if (format === "dropdown") {

        var layout = {
            font: {
                size: 20
            },
            title: title_string,
            barmode: "stack",
            yaxis: {
                title: ystring,
                range: [0, 100]
            },
            xaxis: {
                title: xstring, 
                range: [-0.5, 23.5]
            },
            updatemenus: [{
                y: 1, 
                yanchor: "top", 
                buttons: buttons
            }]
        }

    }

    return [graphish_fin, layout];

}

// ///////////////////////////////////////////////////////////////