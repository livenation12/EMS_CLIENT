import { format } from 'date-fns';


export const formatDateTimeString = (stringDate) => {
     if (!stringDate) {
          return '';
     }
     const date = new Date(stringDate);
     return format(date, 'MM/dd/yyyy hh:mm a');
};


export const formatDateToTextField = (date) => {
     return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}