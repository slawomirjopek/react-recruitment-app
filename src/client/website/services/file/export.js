import { Parser } from 'json2csv';

export const exportDataToCsv = ({ data, fields, filename = 'export' }) => {
  const json2Csv = new Parser({ fields });
  const blob = new Blob([json2Csv.parse(data)], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, `${filename}.csv`);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
