// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/shared/ProductDetailsContent.tsx
// 'use client';

// import React from 'react';
// import Input from '@/components/atomic/Input';
// import FormError from '@/components/atomic/FormError';
// import Button from '@/components/atomic/Button';
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from '@/components/ui/accordion';
// import { MdAddShoppingCart } from 'react-icons/md';
// import { InputTypes } from '@/utils/type';
// import { UseFormRegister, FieldErrors } from 'react-hook-form';

// interface Props {
//   selectedQuantity: number;
//   onQuantityChange: (value: number) => void;
//   selectedInputs: any[];
//   register: UseFormRegister<any>;
//   errors: FieldErrors;
//   btnText: string;
// }

// const inputQuantityOptions = [
//   { id: 1, label: '1' },
//   { id: 2, label: '2' },
//   { id: 3, label: '3' },
//   { id: 4, label: '4' },
// ];

// const ProductDetailsContent: React.FC<Props> = ({
//   selectedQuantity,
//   onQuantityChange,
//   selectedInputs,
//   register,
//   errors,
//   btnText,
// }) => {
//   return (
//     <>
//       <Input
//         variant="secondary"
//         type="number"
//         inputName="quantity"
//         label="الكمية"
//         options={inputQuantityOptions}
//         value={selectedQuantity}
//         onChange={(e) => {
//           const val = Number(e.target.value);
//           if (val >= 1) onQuantityChange(val);
//         }}
//       />

//       <Accordion type="single" collapsible>
//         <AccordionItem value="extra-options">
//           <AccordionTrigger className="cursor-pointer border-b border-gray-300 pb-2 mb-3">
//             خيارات إضافية
//           </AccordionTrigger>
//           <AccordionContent className="space-y-3 max-h-60 overflow-auto">
//             {selectedInputs.map((input) => (
//               <div key={input.id}>
//                 <Input
//                   variant="secondary"
//                   type={input.type as InputTypes}
//                   inputName={input.inputName}
//                   label={input.label}
//                   options={input.options}
//                   otherClassNameContainer={
//                     errors[input.inputName] ? 'border-red-500' : ''
//                   }
//                   isRequired
//                   {...register(input.inputName)}
//                 />
//                 {errors[input.inputName] && (
//                   <FormError message={errors[input.inputName]?.message} />
//                 )}
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       <Button
//         type="submit"
//         otherClassName="w-full py-3 px-5 flex items-center justify-center gap-2"
//         Icon={MdAddShoppingCart}
//       >
//         {btnText}
//       </Button>
//     </>
//   );
// };

// export default ProductDetailsContent;
