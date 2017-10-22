# General Utilities for processing SBE Data

### Installation ###
Please refer to [INSTALL.md](./INSTALL.md) for installation instructions.

### Overview of available scripts ###
#### Utility for converting Seabird Electronics .hex/.XMLCON raw data into csv-formatted text files ####
```
usage: odf_convert_sbe.py [-h] [-d] [--csv] [-o outputDir] hex_file XMLCON_file

positional arguments:
  hex_file      the .hex data file to process
  XMLCON_file   the .XMLCON data file to process

optional arguments:
  -h, --help    show this help message and exit
  -d, --debug   display debug messages
  -csv          return the converted data values in an csv-formatted file
  -o output_dir location to save output files
```

#### Utility for extracting Niskin bottle firing related data from converted csv-formatted text files ####

```
usage: odf_process_bottle.py [-h] [-d] [--csv] [-o outputDir] plk_file

positional arguments:
  pkl_file  the converted pickle-formatted file to process

optional arguments:
  -h, --help    show this help message and exit
  -d, --debug   display debug messages
  -csv          return the converted data values in an csv-formatted file
  -o output_dir location to save the output files
```

#### Utility for processing ctd sensor related data from converted csv-formatted text files ####

```
usage: odf_process_ctd.py [-h] [-d] [-i cnv_file] [-o dest_dir] ini_file

positional arguments:
  ini_file     the .ini file to use for processing

optional arguments:
  -h, --help   show this help message and exit
  -d, --debug  display debug messages
  -i cnv_file  the converted, csv-formatted ctd data to process, this
               argument overrides any data file specified in the .ini file
  -o dest_dir  location to save output files
```

#### Sample Script for importing converted SBE Data ####
```
usage: sampleImport.py [-h] [-d] converted_File

positional arguments:
  cnv_file  the converted, csv-formatted data file to process

optional arguments:
  -h, --help      show this help message and exit
  -d, --debug     display debug messages
```  

#### Sample Script for exporting Pandas dataframes to csv-formatted text files with the CLIVAR 2-row header record. ####

```
usage: sampleExport.py [-h] [-d] [-w] converted_file output_file

positional arguments:
  cnv_file     the converted, csv-formatted data file to import to a dataframe
  output_file  the filename to export the dataframe to

optional arguments:
  -h, --help       show this help message and exit
  -d, --debug      display debug messages
  -w, --overwrite  overwrite the pre-existing output file if found
```

#### Sample Script for converting raw SBE Data ####
```
usage: sampleConvert.py [-h] [-d] hex_file XMLCON_file

positional arguments:
  hex_file     the .hex data file to process
  XMLCON_file  the .XMLCON data file to process

optional arguments:
  -h, --help   show this help message and exit
  -d, --debug  display debug messages
```

### Additional information ####
- Please take a look at [SETUP.md](./SETUP.md) for recommendation on how to setup the SBE CTD Hardware and SBE Data Acquisition software.
- Please take a look at [COOKBOOK.md](./COOKBOOK.md) for suggestions on how to leverage the ODF-CTD-PROC utilities during a cruise.
- Please take a look at [CTD_PROCESSING.md](./CTD_PROCESSING.md) for instuctions on how to process CTD casts leveraging the ODF-CTD-PROC utilities.
- Please take a look at [TODO.md](./TODO.md) for to see known issues with ODF-CTD-PROC as well as a roadmap for the project's ongoing development.

### LICENSING ###
Please refer to [LICENSE.md](./LICENSE.md)
