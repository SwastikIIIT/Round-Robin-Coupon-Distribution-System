'use client'
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown,
  Plus,
  Tag,
  Edit,
  Trash,
  X,
  Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const AdminPanel = () => {
    
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'ascending' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    message: '',
    discount: '',
    startDate: '',
    endDate: '',
    isActive: true,
    isClaimed: false,
  });
  const [editingCoupon,setEditingCoupon]=useState(null);
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const itemsPerPage=5;

  const fetchCoupons=async()=>{
    try {
      const response = await fetch('/api/fetch-coupon');
      if(!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      const data = await response.json();
      setCoupons(data);
      setFilteredCoupons(data);
    } catch (err) {
      console.error('Error fetching coupons:', err);
      toast({title: "Error",description: "Failed to load coupons. Please try again.",variant: "destructive"});
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  console.log("Coupons array:",coupons);

  const handleSearch = (value) => {
    setSearchField(value);
    const filtered = coupons.filter(coupon => 
      Object.values(coupon).some(item => 
        String(item).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredCoupons(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const sortedCoupons = [...filteredCoupons].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'descending' ? -1 : 1;
      return 0;
    });

    setFilteredCoupons(sortedCoupons);
    setSortConfig({ key, direction });
  };

  const handleNewCouponChange=(e)=>{
    const {name,value,type,checked}=e.target;
    setNewCoupon({
      ...newCoupon,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEditCouponChange = (e) => {
    const {name,value,type,checked}=e.target;
    setEditingCoupon({
      ...editingCoupon,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddCoupon = async () => {
    try {
        const response=await fetch('/api/add-coupon',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...newCoupon}),
      });

      if (!response.ok) {
        throw new Error('Failed to add coupon');
      }

      const addedCoupon=await response.json();
      
      // Update local state with new data from server
      setCoupons(prevCoupons=>[...prevCoupons,addedCoupon]);
      setFilteredCoupons(prevFilteredCoupons=>[...prevFilteredCoupons, addedCoupon]);
      
      // Reset form
      setNewCoupon({
        code: '',
        message: '',
        discount: '',
        startDate: '',
        endDate: '',
        isActive: true,
        isClaimed: false,
      });
      
      setIsDialogOpen(false);
      toast.success("Success",{description: "Coupon added successfully!"});
    } catch (err) {
      console.log('Error adding coupon:', err);
      toast.error("Error",{description: "Failed to add coupon. Please try again."});
    } 
  };

  const handleEditCoupon = async () => {
    try {
          const response=await fetch(`/api/edit-coupon`,{
          method:'PUT',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(editingCoupon),
      });

      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }

      const updatedCoupon=await response.json();
      
      // Update local state with data from server
      setCoupons((prevCoupons)=>prevCoupons.map(coupon=>coupon._id===updatedCoupon._id?updatedCoupon:coupon));
      setFilteredCoupons((prevFilteredCoupons)=>prevFilteredCoupons.map(coupon=>coupon._id===updatedCoupon._id?updatedCoupon:coupon));
      
      setEditingCoupon(null);
      toast.success("Success",{description: "Coupon updated successfully!"});
    }
      catch(err){
      console.log('Error updating coupon:', err);
      toast.error("Error",{description: "Failed to update coupon. Please try again."});
    }
  };

  const handleDeleteCoupon = async (id) => {
    if(window.confirm('Are you sure you want to delete this coupon?')){
      try{
        const response=await fetch(`/api/delete-coupon`,{
           method:'POST',
           body:JSON.stringify({id}),
        });

        if (!response.ok) {
          throw new Error('Failed to delete coupon');
        }
        
        // Update local state after successful deletion
        setCoupons(prevCoupons=>prevCoupons.filter(coupon=>coupon._id!==id));
        setFilteredCoupons(prevFilteredCoupons=>prevFilteredCoupons.filter(coupon=>coupon._id!== id));

        toast.success("Success",{description: "Coupon deleted successfully!"});
      }catch(err){
        console.log('Error deleting coupon:', err);
        toast("Error",{description: "Failed to delete coupon. Please try again."});
       }
    }
  };

  const handleToggleStatus=async(id) => {
    try {
      const currentCoupon=coupons.find(coupon=>coupon._id===id);
      const updatedStatus=!currentCoupon.isActive;

      console.log(currentCoupon);
      const response=await fetch(`/api/toggle-coupon-status`,{
        method:'PATCH',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({id,isActive:updatedStatus}),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle coupon status');
      }

      const updatedCoupon=await response.json();
      // Update local state with data from server
      setCoupons(prevCoupons=>prevCoupons.map(coupon=>coupon._id=== id?updatedCoupon:coupon));
      setFilteredCoupons(prevFilteredCoupons=>prevFilteredCoupons.map(coupon=>coupon._id===id?updatedCoupon:coupon));
      
      toast("Success",{description:`Coupon ${updatedStatus?'activated':'deactivated'} successfully!`});
    } catch (err) {
      console.log('Error toggling coupon status:', err);
      toast.error("Error",{description: "Failed to update coupon status. Please try again."});
    }
  };

const formatDate=(dateString)=>{
       const date=new Date(dateString);
       const DateString=date.toLocaleDateString("en-US",{
           year:'numeric',
           month: '2-digit',
          day: '2-digit',
       })
       return DateString;
}

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoupons = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCoupons.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  console.log("Newly created coupon",newCoupon);

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12 md:py-18">
        <Card className="w-full max-w-6xl mx-auto shadow-lg"> 
          <CardHeader className="-mt-6 h-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl mt-2 font-bold text-center">
              Coupon Management Dashboard
            </CardTitle>
          </CardHeader>
        
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center py-4 pb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search coupons..."
                  value={searchField}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 w-full border-gray-300"
                />
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add New Coupon
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Coupon</DialogTitle>
                    <DialogDescription>
                      Create a new coupon with the details below
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">
                        Code
                      </Label>
                      <Input
                        id="code"
                        name="code"
                        value={newCoupon.code}
                        onChange={handleNewCouponChange}
                        placeholder="e.g. SUMMER25"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="discount" className="text-right">
                        Discount
                      </Label>
                      <Input
                        id="discount"
                        name="discount"
                        value={newCoupon.discount}
                        onChange={handleNewCouponChange}
                        placeholder="e.g. 25 for 25%"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="message" className="text-right pt-2">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={newCoupon.message}
                        onChange={handleNewCouponChange}
                        placeholder="Coupon description"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startDate" className="text-right">
                        Start Date
                      </Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={newCoupon.startDate}
                        onChange={handleNewCouponChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="endDate" className="text-right">
                        End Date
                      </Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newCoupon.endDate}
                        onChange={handleNewCouponChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="isActive" className="text-right">
                        Active
                      </Label>
                      <div className="col-span-3 flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          name="isActive"
                          checked={newCoupon.isActive}
                          onCheckedChange={(checked) => 
                            setNewCoupon({...newCoupon, isActive: checked})
                          }
                        />
                        <Label htmlFor="isActive">
                          {newCoupon.isActive ? 'Enabled' : 'Disabled'}
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" className="cursor-pointer" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      onClick={handleAddCoupon} 
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                    >
                      Add Coupon
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {editingCoupon && (
                <Dialog open={!!editingCoupon} onOpenChange={(open)=>!open && setEditingCoupon(null)}>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Coupon</DialogTitle>
                      <DialogDescription>
                        Update coupon details
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="editCode" className="text-right">
                          Code
                        </Label>
                        <Input
                          id="editCode"
                          name="code"
                          value={editingCoupon.code}
                          onChange={handleEditCouponChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="editDiscount" className="text-right">
                          Discount
                        </Label>
                        <Input
                          id="editDiscount"
                          name="discount"
                          value={editingCoupon.discount}
                          onChange={handleEditCouponChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="editMessage" className="text-right pt-2">
                          Message
                        </Label>
                        <Textarea
                          id="editMessage"
                          name="message"
                          value={editingCoupon.message}
                          onChange={handleEditCouponChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="editStartDate" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="editStartDate"
                          name="startDate"
                          type="date"
                          value={editingCoupon.startDate.split('T')[0]}
                          onChange={handleEditCouponChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="editEndDate" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="editEndDate"
                          name="endDate"
                          type="date"
                          value={editingCoupon.endDate.split('T')[0]}
                          onChange={handleEditCouponChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="editIsActive" className="text-right">
                          Active
                        </Label>
                        <div className="col-span-3 flex items-center space-x-2">
                          <Switch
                            id="editIsActive"
                            name="isActive"
                            checked={editingCoupon.isActive}
                            onCheckedChange={(checked) => 
                              setEditingCoupon({...editingCoupon,isActive:checked})
                            }
                          />
                          <Label htmlFor="editIsActive">
                            {editingCoupon.isActive ? 'Enabled' : 'Disabled'}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" className="cursor-pointer" variant="outline" onClick={()=>setEditingCoupon(null)}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        onClick={handleEditCoupon} 
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                      >Update Coupon
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {coupons.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No coupons found. Create your first coupon!</p>
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead 
                        onClick={()=>handleSort('code')}
                        className="cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <div className="flex items-center">
                          Code 
                          {sortConfig.key === 'code' && (
                            sortConfig.direction === 'ascending' 
                              ?<ChevronUp className="ml-2 h-4 w-4" /> 
                              :<ChevronDown className="ml-2 h-4 w-4" />
                          )}
                          {sortConfig.key !== 'code' && (
                            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead 
                        onClick={()=>handleSort('discount')}
                        className="cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <div className="flex items-center">
                          Discount 
                          {sortConfig.key === 'discount' && (
                            sortConfig.direction === 'ascending' 
                              ? <ChevronUp className="ml-2 h-4 w-4" /> 
                              : <ChevronDown className="ml-2 h-4 w-4" />
                          )}
                          {sortConfig.key !== 'discount' && (
                            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Validity Period</TableHead>
                      <TableHead >Status</TableHead>
                      <TableHead>Actions</TableHead>
                      <TableHead >Ip of client</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {currentCoupons.map((coupon) => (
                      <TableRow key={coupon._id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-blue-600">{coupon.code}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{coupon.message}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">
                            {coupon.discount}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-gray-600">
                            <div>From: {formatDate(coupon.startDate)}</div>
                            <div>To: {formatDate(coupon.endDate)}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {coupon.isActive ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
                                Active
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-0">
                                Inactive
                              </Badge>
                            )
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="cursor-pointer h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={()=>setEditingCoupon(coupon)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`cursor-pointer h-8 px-2 ${coupon.isActive ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-green-600 border-green-200 hover:bg-green-50'}`}
                              onClick={()=>handleToggleStatus(coupon._id)}
                            >
                              {coupon.isActive?(
                                <X className="h-4 w-4" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="cursor-pointer h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                              onClick={()=>handleDeleteCoupon(coupon._id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-base">{coupon?.claimedBy?.map((item)=>(`${item} `)) || "Not claimed"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {filteredCoupons.length>itemsPerPage && (
              <div className="flex justify-center items-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        className="cursor-pointer"
                        onClick={()=>setCurrentPage(initial=>Math.max(initial-1,1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    
                    {pageNumbers.map(item => (
                      <PaginationItem className="cursor-pointer" key={item}>
                        <PaginationLink
                          isActive={item===currentPage}
                          onClick={()=>setCurrentPage(item)}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        className="cursor-pointer"
                        onClick={()=>setCurrentPage(prev=>Math.min(prev + 1, pageNumbers.length))}
                        disabled={currentPage === pageNumbers.length}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredCoupons.length>0 &&  (
              <div className="text-center text-sm text-gray-500 mt-6">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCoupons.length)} 
              {' '}of {filteredCoupons.length} coupons
            </div>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
