import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '~/decorators/public.decorator';

@Controller('product')
@ApiTags('Sản phẩm')
@Public()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // @ApiOperation({ summary: 'Cập nhật thông tin user đăng nhập' })
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get('list')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('sync')
  @ApiOperation({ summary: 'Đồng bộ sản phẩm với fakestoreapi' })
  syncProduct() {
    return this.productService.syncProduct();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
