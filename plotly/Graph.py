import numpy as np
import pandas as pd
import pickle as pkl
import datetime as dt
import matplotlib.cm as cm
import matplotlib.pyplot as plt
from colour import Color
from windrose import WindroseAxes
from calendar import monthrange, month_name
import pylab as p 

import vis
import utils
import met_funcs

# Place input files here
inputfiles_here = ['2012_August.csv']

# Load and filter data
actual_data = met_funcs.load_met_data(inputfiles_here)
actual_data = met_funcs.drop_nan_cols(actual_data)
actual_data = met_funcs.qc_mask(actual_data)

# Extract categorical information
keep_cats = met_funcs.categories_to_keep()
ex_cats = met_funcs.categories_to_exclude()
var_cats,var_units,var_labels,var_save = met_funcs.categorize_fields(actual_data,keep_cats,ex_cats)

# Extract more information
met_funcs.groom_data(actual_data,var_cats)
stab_conds,stab_cats = met_funcs.flag_stability(actual_data)
cate_info = met_funcs.get_catinfo(actual_data)

# Plot the data with the desired category and function
category = 'speed'
vis.normalized_hist_by_stability(actual_data,cate_info,category)

plt.show()