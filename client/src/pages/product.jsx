import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosClient from "@/lib/axiosClient";
import { fDate, fVND } from "@/lib/utils";
import DialogAddProduct from "@/sections/products/dialog-add-product";
import { useCallback, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

function Product() {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const products = await axiosClient.get("/product/all");
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateProduct = async (fData, id) => {
    try {
      if (id) {
        const res = await axiosClient.patch(`/product/update/${id}`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res) {
          toast.success("Cập nhật sản phẩm thành công");
          fetchProducts();
        } else {
          throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm");
        }
        return;
      }
      const res = await axiosClient.post("/product/create", fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        toast.success("Thêm sản phẩm thành công");
        fetchProducts();
      } else {
        throw new Error("Có lỗi xảy ra khi tọa sản phẩm mới");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDel = async (id) => {
    try {
      const res = await axiosClient.delete(`/product/delete/${id}`);
      if (res) {
        toast.success("Xóa sản phẩm thành công");
        fetchProducts();
      } else {
        throw new Error("Có lỗi khi xóa sản phẩm");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-end mb-2">
        <DialogAddProduct onSubmit={handleCreateProduct}>
          <Button>Thêm sản phẩm</Button>
        </DialogAddProduct>
      </div>
      <Table>
        <TableCaption>Danh sách sản phẩm</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Loại sản phẩm</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product?._id}>
              <TableCell className="font-medium">{product?._id}</TableCell>
              <TableCell>
                <img className="w-[100px]" src={product?.image} alt="" />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{fVND(product?.price)}</TableCell>
              <TableCell>{product?.stock}</TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell>{fDate(product?.createdAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center justify-end">
                  {/* <Button variant="outline">Sửa</Button> */}
                  <DialogAddProduct
                    defaultValue={product}
                    onSubmit={handleCreateProduct}
                  >
                    <Button variant="outline">Sửa</Button>
                  </DialogAddProduct>
                  <Button
                    onClick={() => handleDel(product?._id)}
                    variant="destructive"
                  >
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Product;
