### Configuration File ###
From the cruise processing directory:

```
data/ini-files/configuration.ini
```

Edit the following sections of the configuration file:
- [cruise] change all values specific to the cruise
- [ctd_processing]
      ctd_serial: sss
- [ctd_processing]
      TC_side: 1->2 for secondary input
- [inputs] Might need to edit this section depending on the converted file header. This section sets up column call input to data/converted directory.
- [time_series_output] Should not need to edit this section; maintains time series column headers.
- [pressure_series_output] Should not need to edit this section; maintains pressure series column headers.

### Process CTD Data ###
For preliminary processing run the following command on each raw data file. The file base name should be ssscc.{hex,XMLCON} (s � station, c - cast).

```
./odf_convert_sbe.py data/raw/ssscc.hex data/raw/ssscc.XMLCON -o data/converted/
```

### Process Bottle data ###
For preliminary processing run the following command on each raw data file. The file base name should be ssscc.{hex,XMLCON} (s - station, c - cast).

```
./odf_process_bottle.py data/converted/ssscc_cnv.csv -o data/bottle/
```

### Fit Pressure data ###
```
./odf_calibrate_ctd.py ssscc-ssscc -press
```

This averages the ondeck pressure reading for the selected group of station casts and outputs the resulting suggested offset to a log file.

```
./odf_fit_ctd.py data/time/ssscc_time.cnv -pres
```

This reads the log file and applies appropriate offset to selected file.

- Range only applies to pressure, otherwise allow to run without arguments
- odf_fit_ctd.py automatically applies coefficients to both sensors if CT

### Fit Temperature data ###
```
./odf_calibrate_ctd.py ssscc-ssscc -temp [-primary:-secondary] -calib P -order [0,1,2] -xRange [min:max]
```

*Example:*
```
./odf_calibrate_ctd.py 03001-03901 -temp -calib P -primary -order 2 -xRange 1000:6000
```

This process reads sbe35 data for selected station casts and compares with ctd bottle data. The residual differences are optimized through a polyfit routine and an optimal set of coefficients are recorded in a log file for each station cast.

*TODO:* need to specify reft_directory in config file and in directory structure for it to work

Flags:
- temp
- primary
- secondary
- calib, select only P (calibrate to pressure) for now
- order, polynomial order of calibration
- xRange, range for calibration parameter

```
./odf_fit_ctd.py data/time/ssscc_time.csv -temp
```

This reads the log file and applies appropriate coefficients to selected file.

### Fit Conductivity data: ###
```
./odf_calibrate_ctd.py ssscc-ssscc -cond
```

*Example:*
```
./odf_calibrate_ctd.py 03001-03901 -cond -calib P -secondary -order 0 -xRange 200:6000
```

This process reads bottle salinity data for selected station casts and compares with ctd bottle data. The residual differences are optimized through a polyfit routine and an optimal set of coefficients are recorded in a log file for each station cast.

Flags:
- temp
- primary
- secondary
- calib, select only P (calibrate to pressure) for now
- order, polynomial order of calibration
- xRange, range for calibration parameter

```
./odf_fit_ctd.py data/time/ssscc_time.csv -cond
```

This reads the log file and applies appropriate coefficients to selected file.

### Fit Oxygen Data ###
Dissolved oxygen analytical data files need to be accessible command line and the path defined in the `data/ini-files/configuration.ini` file. The o2flask file needs to be in the same directory.

Same file base name pattern. `-oxy` flag fits DO data from the path file following the flag.

```
./odf_fit_ctd.py data/time/ssscc_time.csv -oxy data/oxygen/ssscc
```
