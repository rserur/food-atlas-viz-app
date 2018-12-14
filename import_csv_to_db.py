#Import csv dataset to Postgresql

import psycopg2
import pandas as pd

conn = psycopg2.connect("host=localhost dbname=final_project user=postgres")
cur = conn.cursor()

data = pd.read_csv('data/df_for_webapp.csv')

for i, d in data.iterrows():
        cur.execute('''INSERT INTO food_atlas (id, fips, county, state, pct_laccess_pop15,
        pct_laccess_lowi15, pct_laccess_hhnv15, pct_laccess_snap15, pct_laccess_child15,
        pct_laccess_seniors15, pct_laccess_white15, pct_laccess_black15, pct_laccess_hisp15,
        pct_laccess_nhasian15, pct_laccess_nhna15, pct_laccess_nhpi15, pct_laccess_multir15,
        grocpth14, supercpth14, convspth14, specspth14, snapspth16, ffrpth14, fsrpth14, pct_snap16,
        pct_nslp15, pct_sbp15, pct_sfsp15, pct_wic15, sodatax_stores14, sodatax_vendm14,
        chipstax_stores14, chipstax_vendm14, food_tax14, fmrktpth16, pct_fmrkt_snap16, pct_fmrkt_wic16,
        pct_fmrkt_wiccash16, pct_fmrkt_sfmnp16, pct_fmrkt_credit16, pct_fmrkt_frveg16, pct_fmrkt_anmlprod16,
        pct_fmrkt_baked16, pct_fmrkt_otherfood16, foodhub16, pct_diabetes_adults13,
        pct_obese_adults13, pct_hspa15, recfacpth14, pct_nhwhite10, pct_nhblack10, pct_hisp10, pct_nhasian10,
        pct_nhna10, pct_nhpi10, pct_65older10, pct_18younger10, medhhinc15, povrate15, metro13)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)''',
        (d.FIPS, d.FIPS,d.County,d.State,d.PCT_LACCESS_POP15,
       d.PCT_LACCESS_LOWI15,d.PCT_LACCESS_HHNV15,d.PCT_LACCESS_SNAP15,d.PCT_LACCESS_CHILD15,
       d.PCT_LACCESS_SENIORS15,d.PCT_LACCESS_WHITE15,d.PCT_LACCESS_BLACK15,d.PCT_LACCESS_HISP15,
       d.PCT_LACCESS_NHASIAN15,d.PCT_LACCESS_NHNA15,d.PCT_LACCESS_NHPI15,d.PCT_LACCESS_MULTIR15,
       d.GROCPTH14,d.SUPERCPTH14,d.CONVSPTH14,d.SPECSPTH14,d.SNAPSPTH16,d.FFRPTH14,d.FSRPTH14,d.PCT_SNAP16,
       d.PCT_NSLP15,d.PCT_SBP15,d.PCT_SFSP15,d.PCT_WIC15,d.SODATAX_STORES14,d.SODATAX_VENDM14,
       d.CHIPSTAX_STORES14,d.CHIPSTAX_VENDM14,d.FOOD_TAX14,d.FMRKTPTH16,d.PCT_FMRKT_SNAP16,d.PCT_FMRKT_WIC16,
       d.PCT_FMRKT_WICCASH16,d.PCT_FMRKT_SFMNP16,d.PCT_FMRKT_CREDIT16,d.PCT_FMRKT_FRVEG16,d.PCT_FMRKT_ANMLPROD16,
       d.PCT_FMRKT_BAKED16,d.PCT_FMRKT_OTHERFOOD16,d.FOODHUB16,d.PCT_DIABETES_ADULTS13,
       d.PCT_OBESE_ADULTS13,d.PCT_HSPA15,d.RECFACPTH14,d.PCT_NHWHITE10,d.PCT_NHBLACK10,d.PCT_HISP10,d.PCT_NHASIAN10,
       d.PCT_NHNA10,d.PCT_NHPI10,d.PCT_65OLDER10,d.PCT_18YOUNGER10,d.MEDHHINC15,d.POVRATE15,d.METRO13))

        conn.commit()
cur.close()
conn.close()
