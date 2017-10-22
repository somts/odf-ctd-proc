#!/bin/bash

#General Testing
# python3 ./odf_convert_sbe.py -h
# python3 ./odf_process_bottle.py -h
# python3 ./odf_process_ctd.py -h
# python3 ./sampleConvert.py -h
# python3 ./sampleImport.py -h
# python3 ./sampleExport.py -h

SOURCEDIR="./sampleData"
FILE_PREFIX="FK171005_CTD005_20171018"
OUTPUTDIR="./unitTesting"

python3 ./odf_convert_sbe.py -d --csv -o ${OUTPUTDIR} ${SOURCEDIR}/${FILE_PREFIX}.hex ${SOURCEDIR}/${FILE_PREFIX}.XMLCON

python3 ./odf_process_bottle.py -d --csv -o ${OUTPUTDIR} ${OUTPUTDIR}/${FILE_PREFIX}_cnv.pkl

# python3 ./odf_process_ctd.py -d -i ${OUTPUTDIR}/${FILE_PREFIX}_cnv.csv ${SOURCEDIR}/configuration.ini

# python3 ./sampleConvert.py -d ${SOURCEDIR}/${FILE_PREFIX}.hex ${SOURCEDIR}/${FILE_PREFIX}.XMLCON

# python3 ./sampleImport.py -d -w ${OUTPUTDIR}/${FILE_PREFIX}_cnv.csv

# python3 ./sampleExport.py -d -w ${OUTPUTDIR}/${FILE_PREFIX}_cnv.csv ${OUTPUTDIR}/${FILE_PREFIX}_output.csv

ls ${OUTPUTDIR}
