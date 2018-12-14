#Import CSV to Postgresql 

import psycopg2
import pandas as pd


conn = psycopg2.connect("host=localhost dbname=final_project user=tushald port=5433")
cur = conn.cursor()
csv_data = pd.read_csv('combined.csv')
for idx, u in csv_data.iterrows():
  cur.execute('''INSERT INTO food_atlas (state,county,pct_laccess_pop15,pct_laccess_lowi15,pct_laccess_hhnv15,pct_laccess_snap15,pct_laccess_child15,pct_laccess_seniors15,pct_laccess_white15,pct_laccess_black15,pct_laccess_hisp15,pct_laccess_nhasian15,pct_laccess_nhna15,pct_laccess_nhpi15,pct_laccess_multir15,grocpth14,supercpth14,convspth14,specspth14,snapspth16,ffrpth14,fsrpth14,pct_snap16,pct_nslp15,pct_sbp15,pch_sfsp_09_15,pct_wic15,sodatax_stores14,sodatax_vendm14,chipstax_stores14,chipstax_vendm14,food_tax14,fmrktpth16,pct_fmrkt_snap16,pct_fmrkt_wic16,pct_fmrkt_wiccash16,pct_fmrkt_sfmnp16,pct_fmrkt_credit16,pct_fmrkt_frveg16,pct_fmrkt_anmlprod16,pct_fmrkt_baked16,pct_fmrkt_otherfood16,foodhub16,pct_diabetes_adults13,pct_obese_adults13,pct_hspa15,recfacpth14,pct_nhwhite10,pct_nhblack10,pct_hisp10,pct_nhasian10,pct_nhna10,pct_nhpi10,pct_65older10,pct_18younger10,medhhinc15,povrate15,metro13)
  	VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)''',
  (u.State,u.County,u.PCT_LACCESS_POP15,u.PCT_LACCESS_LOWI15,u.PCT_LACCESS_HHNV15,u.PCT_LACCESS_SNAP15,u.PCT_LACCESS_CHILD15,u.PCT_LACCESS_SENIORS15,u.PCT_LACCESS_WHITE15,u.PCT_LACCESS_BLACK15,u.PCT_LACCESS_HISP15,u.PCT_LACCESS_NHASIAN15,u.PCT_LACCESS_NHNA15,u.PCT_LACCESS_NHPI15,u.PCT_LACCESS_MULTIR15,u.GROCPTH14,u.SUPERCPTH14,u.CONVSPTH14,u.SPECSPTH14,u.SNAPSPTH16,u.FFRPTH14,u.FSRPTH14,u.PCT_SNAP16,u.PCT_NSLP15,u.PCT_SBP15,u.PCH_SFSP_09_15,u.PCT_WIC15,u.SODATAX_STORES14,u.SODATAX_VENDM14,u.CHIPSTAX_STORES14,u.CHIPSTAX_VENDM14,u.FOOD_TAX14,u.FMRKTPTH16,u.PCT_FMRKT_SNAP16,u.PCT_FMRKT_WIC16,u.PCT_FMRKT_WICCASH16,u.PCT_FMRKT_SFMNP16,u.PCT_FMRKT_CREDIT16,u.PCT_FMRKT_FRVEG16,u.PCT_FMRKT_ANMLPROD16,u.PCT_FMRKT_BAKED16,u.PCT_FMRKT_OTHERFOOD16,u.FOODHUB16,u.PCT_DIABETES_ADULTS13,u.PCT_OBESE_ADULTS13,u.PCT_HSPA15,u.RECFACPTH14,u.PCT_NHWHITE10,u.PCT_NHBLACK10,u.PCT_HISP10,u.PCT_NHASIAN10,u.PCT_NHNA10,u.PCT_NHPI10,u.PCT_65OLDER10,u.PCT_18YOUNGER10,u.MEDHHINC15,u.POVRATE15,u.METRO13>0))
  conn.commit()
cur.close()
conn.close()